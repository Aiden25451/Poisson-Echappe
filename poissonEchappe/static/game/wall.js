class Wall {
 
    constructor(x, y, width, height, camera) {
        this.camera = camera;
        this.original_x = x;

        this.width = width;
        this.height = height;

        this.x = this.original_x - this.camera.camx;
        this.y = y;
    }

    draw(ctx) {
        ctx.fillStyle = "#ff0"
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
        if(!deltaTime) return;

        this.x = this.original_x - this.camera.camx;
    }
}