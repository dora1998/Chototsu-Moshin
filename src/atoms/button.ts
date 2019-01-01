class Button{
    private x:number;
    private y:number;
    private width:number;
    private height:number;
    private text:string;
    private listener:() => void;
    private bgGraphics:Phaser.GameObjects.Graphics;

    constructor(scene, x, y, width, height, text) {
        this.bgGraphics = scene.add.graphics();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;

        this.draw();
        this.bgGraphics.setInteractive(new Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height), Phaser.Geom.Rectangle.Contains);
        this.bgGraphics.on('pointerdown', () => this.onClicked())
        scene.add.text(this.x + (this.width / 2), this.y + (this.height / 2), this.text, { color: '#ffffff', align: 'center' }).setScrollFactor(0).setOrigin(0.5);
    }
    draw() {
        this.bgGraphics.clear();
        this.bgGraphics.fillStyle(0xceaa6f);
        this.bgGraphics.fillRect(this.x, this.y, this.width, this.height).setScrollFactor(0);
        this.bgGraphics.fillStyle(0x635236);
        this.bgGraphics.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10).setScrollFactor(0);
    }
    onClicked() {
        this.listener();
    }
    setListener(listener: () => void) {
        this.listener = listener;
    }
}

export {Button}