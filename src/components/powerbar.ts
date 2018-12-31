const COLOR_GREEN = 0x1fff4e;
const COLOR_ORANGE = 0xff9b40;
const COLOR_RED = 0xff3710;

class PowerBar extends Phaser.GameObjects.Graphics{
    private max:number;
    private current:number = 0;
    constructor(scene, x, y, max) {
        super(scene);
        this.x = x;
        this.y = y;
        this.max = max;

        this.draw();
        scene.add.existing(this);
    }
    draw() {
        this.clear();
        this.fillStyle(0x000000);
        this.fillRect(this.x, this.y, 400, 80).setScrollFactor(0);
        this.fillStyle(this.getBarColor());
        this.fillRect(this.x + 10, this.y + 10, this.getPartialBarWidth(), 60).setScrollFactor(0);
    }
    updateBar(newState:number) {
        this.current = newState;
        this.draw();
    }
    getPartialBarWidth() {
        return 380 * this.current / this.max;
    }
    getBarColor() {
        let percent = this.current / this.max * 100;
        if (percent < 60) {
            return COLOR_GREEN;
        } else if (percent < 80) {
            return COLOR_ORANGE;
        } else {
            return COLOR_RED;
        }
    }
}

export {PowerBar}