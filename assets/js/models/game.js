class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;

        this.drawIntervalId = undefined;
        this.fps = FPS;
        this.keys = {}


        //CHARACTERS & ITEMS
        this.mario = new Mario(this.ctx, MARIO_START_X, MARIO_START_Y);
        this.mario.groundTo(this.canvas.height - FLOOR)

        this.lives = 3;
        this.isInvincible = false;

        this.score = 0;
        this.scoreMessages = [];

        this.barrels = []
        this.barrelTick = 0;
        this.randomInterval = 120;

        this.platforms = [];
        this.initPlataforms(LEVEL_DATA);
        this.ladders = [];
        this.initLadders(LADDER_DATA);

    }

    start() {
        if (!this.drawIntervalId) {
            this.setupListeners();
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
            }, this.fps)
        }      
    }
    
    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }
    
    setupListeners() {
         document.addEventListener('keydown', (e) => { 
            this.keys[e.keyCode] = true; 
            this.mario.onKeyEvent(event, this.ladders);
         });
         document.addEventListener('keyup', (e) => {
            this.keys[e.keyCode] = false;
            this.mario.onKeyEvent(event, this.ladders);
        });
    }
    

    //RENDERIZADO
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.platforms.forEach(tilePlataform => tilePlataform.draw());
        this.ladders.forEach(tileLadder => tileLadder.draw());
        this.mario.draw();
        this.barrels.forEach(barrel => barrel.draw());
        this.drawLives();
        this.drawScore();

    }

    move() {
        this.mario.updateGround(this.platforms);
        this.mario.move(this.ladders, this.keys);
        this.barrelTick++;
        if (this.barrelTick >= 120 && this.barrels.length < BARRELS_MAX) {
            this.createNewBarrel ();
            this.barrelTick = 0;
            this.randomInterval = Math.floor(Math.random() * (BARREL_SPAWN_MAX - BARREL_SPAWN_MIN + 1)) + BARREL_SPAWN_MIN;
        }

        this.barrels.forEach (barrel => { barrel.move(); });

        this.checkBounds(); // limites Mario
        this.checkCollision(); // revisamos colisiones
        this.checkScore(); //revisamos puntuacion
        this.clearItems(); // limpiador de Items

    }

    // METODOS DE APOYO

    initPlataforms(levelData) {
        levelData.forEach(floor => {
             this.platforms.push(new Plataform(this.ctx, floor.x, floor.y, floor.length));   
        });
    }

    initLadders(ladderData) {
        ladderData.forEach(ladder => {
            this.ladders.push(new Ladder(this.ctx, ladder.x, ladder.y, ladder.h))
        });
    }

    createNewBarrel() {
        const newBarrel = new Barrel(this.ctx, this.canvas.width, 400);

        newBarrel.groundTo(this.canvas.height - FLOOR);
        this.barrels.push(newBarrel);
    }

    checkBounds() {
        if (this.mario.x < 0) {
            this.mario.x = 0;
        }
        if (this.mario.x + this.mario.w > this.canvas.width) {
            this.mario.x = this.canvas.width - this.mario.w;
        }
    }

    checkCollision() {
        this.barrels.forEach(barrel => {
            const marioRight = this.mario.x + this.mario.w;
            const marioBottom = this.mario.y + this.mario.h;

            const barrelRight = barrel.x + barrel.w;
            const barrelBottom = barrel.y + barrel.h;

            const isColliding = this.mario.x < barrelRight &&
                                marioRight > barrel.x &&
                                this.mario.y < barrelBottom &&
                                marioBottom > barrel.y;

            if (isColliding && !this.isInvincible) {
                this.onCollision();
            }
        })
    }

    onCollision() {
        this.lives--;

        this.barrels = [];
        this.barrelTick = 0;

        if (this.lives > 0) {
            this.mario.x = MARIO_START_X;
            this.mario.y = MARIO_START_Y;
            this.mario.vy = 0;
            this.mario.groundTo(this.canvas.height - FLOOR)

            this.isInvincible = true;
            setTimeout(() => {
                this.isInvincible = false;
            }, INVENCIBILITY_TIME);
        } else {
            this.gameOver();
        }
    }

    gameOver() {
        this.stop();
        alert(`GAME OVER - No te quedan mas vidas - Tu Puntuacion es de ${this.score}`)
    }
    
    clearItems() {
        this.barrels = this.barrels.filter(barrel => barrel.isVisible());
    }

    addScore(points) {
        this.score += points;

        const scoreText = document.getElementById('score-value');
        if (scoreText) {
            scoreText.textContent = this.score;
        }
    }

    checkScore() {
        this.barrels.forEach(barrel => {
            const marioRight = this.mario.x + this.mario.w;
            const marioBottom = this.mario.y + this.mario.h;
            const barrelRight = barrel.x + barrel.w;
            
            //Revisar si lo cruzamos Horizontalmente
            const passHorizontal =  marioRight > barrel.x &&
                                    this.mario.x < barrelRight;
            //Revisar si esta por encima del barril
            const passVertical = marioBottom < barrel.y;

            if (passHorizontal && passVertical && !barrel.isJumped) {
                barrel.isJumped = true;
                this.addScore(BARREL_SCORE)
                this.createScoreMessage(barrel.x, barrel.y, BARREL_SCORE);//revisar si hace falta subirlo
            }
        })
    }

    createScoreMessage(x, y, points) {
        const msg = {
            x: x,
            y: y,
            points: points
        };
        this.scoreMessages.push(msg);

        setTimeout(() => {
            this.scoreMessages.shift();
        }, SCORE_SCREEN_TIME);
    }

    drawScore() {
        this.scoreMessages.forEach(msg => {
            const sprite = SCORE_SPRITES[msg.points];

            if (sprite) {
                this.ctx.drawImage(
                    this.mario.img,
                    sprite.sx, sprite.sy,
                    sprite.w, sprite.h,
                    msg.x, msg.y-30,
                    sprite.w*2, sprite.h*2
                );
            }
        });
    }

    drawLives() {
        for (let i = 0; i < this.lives; i++) {
            this.ctx.drawImage(
                this.mario.img,
                LIVE_SX,LIVE_SY,
                LIVE_W, LIVE_H,
                LIVE_X + (i * LIVE_MARGIN),
                LIVE_Y,
                LIVE_W * SCALE,
                LIVE_H * SCALE
            );
        }
    }



}