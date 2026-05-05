class PlataformTile {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.img = new Image();
        this.img.src = SPRITE_SRC;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            PLATAFORM_TILE_SX,PLATAFORM_TILE_SY,
            PLATAFORM_TILE_W, PLATAFORM_TILE_H,
            this.x, this.y,
            PLATAFORM_TILE_W * SCALE, PLATAFORM_TILE_H * SCALE

        );
    }
}