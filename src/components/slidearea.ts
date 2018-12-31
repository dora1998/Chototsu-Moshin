class SlideArea extends Phaser.GameObjects.Graphics{
    constructor(scene) {
        super(scene);
        this.draw();
        scene.add.existing(this);
    }
    draw() {
        console.log("initSlideArea x:" + this.x);

        this.clear();
        this.fillStyle(0x85daff, 0.8);
        this.fillRect(25, 25, 150, 550).setScrollFactor(0);
    }
}

export {SlideArea}