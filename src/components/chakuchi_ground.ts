const WIDTH_PER_YEAR = 100;
const MAX_YEAR = 100;
const YEAR_START = 2020;

class ChakuchiGround extends Phaser.GameObjects.Graphics{
    scene:Phaser.Scene;
    constructor(scene: Phaser.Scene, x, y) {
        super(scene);
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.draw();
        scene.add.existing(this);

        // 年のラベル
        for (let i = 2031; i <= (YEAR_START + MAX_YEAR); i += 12) {
            this.scene.add.text(this.x + WIDTH_PER_YEAR * (i - YEAR_START + 0.5), this.y - 100, `${i}`, { color: '#000000', align: 'center' }).setOrigin(0.5);
        }
    }

    draw() {
        this.fillStyle(0x7f4c2f, 1);
        this.fillRect(this.x, this.y - 150, WIDTH_PER_YEAR * MAX_YEAR, 150);
    }
}

export {ChakuchiGround}