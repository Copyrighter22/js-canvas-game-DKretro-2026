class Mario {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.ground = 0;

        this.h = MARIO_H;
        this.w = MARIO_W;

        this.vx = 0;
    }

    groundTo(groundY) {
        this.y = groundY - this.h;
        this.ground = groundY;
    }

    onKeyEvent(event) {
        const isPressed = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_RIGHT:
                if (isPressed){
                    this.vx = MARIO_VX;
                } else {
                    this.vx = 0;
                }
                break;

            case KEY_LEFT:
                if (isPressed){
                    this.vx = -MARIO_VX;
                } else {
                    this.vx = 0;
                }
                break;
        }

    }

    move() {
        this.x += this.vx;
    }

    draw() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

}