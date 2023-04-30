class Wall {
 
    constructor(x, y, camera) {
        this.camera = camera;
        this.original_x = x;

        this.width = 100;
        this.height = 100;

        this.position = {
            x: this.original_x - this.camera.camx,
            y: y,
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#ff0"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        if(!deltaTime) return;

        this.position.x = this.original_x - this.camera.camx;
    }
}