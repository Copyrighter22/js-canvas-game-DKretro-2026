class Plataform {
    constructor(ctx, x, y, length) {
        this.ctx = ctx;
        this.tiles = [];

        for (let i = 0; i < length; i++) {
            const tileX = x + (i * (PLATAFORM_TILE_W * SCALE));
            this.tiles.push(new PlataformTile(this.ctx, tileX, y))
        }
    }

    draw() {
        this.tiles.forEach(tile => tile.draw());
    }
}