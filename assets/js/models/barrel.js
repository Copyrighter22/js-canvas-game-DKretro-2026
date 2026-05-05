class Barrel{
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = BARREL_W
        this.h = BARREL_H

        this.img = new Image()
        this.img.src = SPRITE_SRC;

        this.vx = BARREL_VX;
        this.animationCount = 0;

        this.isJumped = false;

    }

     groundTo(groundY) {
        this.y = groundY - this.h;
        this.ground = groundY;
    }

    isVisible() {
        return this.x + this.w > 0;
    }

    move() {
        this.x += this.vx;
        //Dixar per futur el caure per les escales
    }

    draw() {
        let sx = 194;
        let sy = 599;

        this.animationCount++;
        if (this.animationCount % 20 < 5) {
            sx = 194;
        } else if (this.animationCount % 20 < 10) {
            sx = 214;
        } else if (this.animationCount % 20 < 15) {
            sx = 234;
        } else {
            sx = 254;
        }

        this.ctx.drawImage(
            this.img,
            sx, sy,
            BARREL_W, BARREL_H,
            this.x, this.y,
            this.w * SCALE, this.h * SCALE
        );
    }

}