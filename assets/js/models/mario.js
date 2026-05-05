class Mario {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.ground = 0;
        this.facing = 'RIGHT';

        this.img = new Image();
        this.img.src = SPRITE_SRC

        this.animationCount = 0;

        this.h = MARIO_H;
        this.w = MARIO_W;

        this.vx = 0;
        this.vy = 0;
        this.gravity = 0;

        this.isJumping = false;
        this.isClimbing = false;
    }

    move(ladders, keys) {

        const onLadder = this.isOverLadder(ladders); //detector de la escalera

        if (!keys) keys = {};
        
        if (onLadder && this.isClimbing) {
            this.vy = 0;
            this.gravity = 0;
         
            if (keys[KEY_UP]) {
                this.y -= 5;
            }
            if (keys[KEY_DOWN]) {
                this.y += 5;
            }

        } else {
            this.gravity = MARIO_GRAVITY;
            this.vy += this.gravity;
            this.isClimbing = false;
        }

        if (this.y + this.h > this.ground) {
            this.groundTo(this.ground);
            this.vy = 0;
            this.isJumping = false;
            this.isClimbing = false;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {

        if (this.vx > 0) { 
            this.facing = 'RIGHT';
        }

        if (this.vx < 0) {
            this.facing = 'LEFT';
        }


        let sx = 52;
        let sy = 16;

        if (this.isJumping) {
            sx = 155;
            sy = 17;
        } else if (this.vx !== 0) {
            this.animationCount++;

            if (this.animationCount % 20 < 10) {
                sx = 72;
                sy = 17;
            } else {
                sx = 115;
                sy = 16;
            }
        } else {
            this.animationCount = 0;
        }

        this.ctx.save();

        if (this.facing === 'LEFT') {
            this.ctx.scale(-1, 1);
            
            this.ctx.drawImage(
                this.img,
                sx, sy,
                16,16,
                -this.x - this.w, this.y,
                this.w * SCALE, this.h * SCALE
            );
        } else {
            
            this.ctx.drawImage(
                this.img,
                sx, sy,
                16,16,
                this.x, this.y,
                this.w * SCALE, this.h * SCALE
            );
        }
        
        this.ctx.restore();
    }

    // METODOS DE APOYO

    groundTo(groundY) {
        this.y = groundY - this.h;
        this.ground = groundY;
    }


    isOverLadder(ladders) {

        const margin = 5;

        for (let i = 0; i < ladders.length; i++) {
            const ladder = ladders[i];

            const marioRight = this.x + (this.w * SCALE);
            const marioBottom = this.y + (this.h * SCALE);
            const marioCenterX = this.x + (this.w * SCALE / 2);
            const leftLimit = ladder.x - margin;
            const rightLimit = ladder.x + (LADDER_TILE_W * SCALE) + margin;

            const horizontalMatch = marioCenterX > leftLimit && marioCenterX < rightLimit &&
                                    this.x + (this.w * SCALE / 2) < ladder.x + (LADDER_TILE_W * SCALE);

            const verticalMatch = marioBottom > ladder.y && this.y < ladder.y + ladder.h;

            if (horizontalMatch && verticalMatch) {
                return true;
            }
        }

        return false;
    }


    onKeyEvent(event, ladders) {
        const isPressed = event.type === 'keydown';
        const onLadder = this.isOverLadder(ladders);

        if (GAME_KEYS.includes(event.keyCode)) {
            event.preventDefault();
        }

        switch (event.keyCode) {

            
            case KEY_UP:
                if (onLadder) {
                    this.isClimbing = isPressed;
                }
                break;

            case KEY_DOWN:
                if (onLadder) {
                    this.isClimbing = isPressed;
                }
                break;

            case KEY_RIGHT:
                if (isPressed){
                    this.isClimbing = false;
                    this.vx = MARIO_VX;
                } else {
                    this.vx = 0;
                }
                break;

            case KEY_LEFT:
                if (isPressed){
                    this.isClimbing = false;
                    this.vx = -MARIO_VX;
                } else {
                    this.vx = 0;
                }
                break;

            case KEY_SPACEBAR:
                if (isPressed && !this.isJumping) {
                    this.isJumping = true;
                    this.isClimbing = false;
                    this.vy = -MARIO_VY;
                }
                break;
        }

    }

    updateGround(platforms) {
        const platform = platforms.find(p => 
            this.x + this.w / 2 > p.x && 
            this.x + this.w / 2 < p.x + p.length * PLATAFORM_TILE_W && 
            Math.abs(this.y + this.h - p.y) < 20 // Tolerancia de 20px
        );

        if (platform) {
            this.ground = platforms.y;
        }
    }

}