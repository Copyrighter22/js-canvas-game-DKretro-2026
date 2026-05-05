class Ladder {
    constructor(ctx, x, y, h) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.h = h;

        this.img = new Image();
        this.img.src = SPRITE_SRC;
    }

    draw() {

        const tileHeightScaled = LADDER_TILE_H * SCALE;
        const numTiles = Math.ceil(this.h / tileHeightScaled);

        for (let i = 0; i < numTiles; i++) {

            const yPos = this.y + (i * tileHeightScaled);
            const remainingHeight = this.h - (i * tileHeightScaled);
            const drawHeight = Math.min(tileHeightScaled, remainingHeight);

            this.ctx.drawImage(
                this.img,
                LADDER_TILE_SX, LADDER_TILE_SY,
                LADDER_TILE_W, LADDER_TILE_H,
                this.x, yPos,
                LADDER_TILE_W * SCALE, drawHeight
            );
        }
    };
}