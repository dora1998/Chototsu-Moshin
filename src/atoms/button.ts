const COLOR_BORDER_NORMAL = 0xceaa6f;
const COLOR_BORDER_DISABLED = 0xededed;
const COLOR_BORDER_MOUSEOVER = 0xf2c686;
const COLOR_FILL_NORMAL = 0x635236;
const COLOR_FILL_DISABLED = 0xa5a5a5;
const COLOR_FILL_MOUSEOVER = 0x89704c;

class Button{
    private x:number;
    private y:number;
    private width:number;
    private height:number;
    private text:string;
    private isEnabled = false;
    private isMouseOver = false;
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
        this.bgGraphics.on('pointerover', (event, gameObjects) => {
            this.isMouseOver = true;
            this.draw();
        });
        this.bgGraphics.on('pointerout', (event, gameObjects) => {
            this.isMouseOver = false;
            this.draw();
        });
        scene.add.text(this.x + (this.width / 2), this.y + (this.height / 2), this.text, { color: '#ffffff', align: 'center', fontSize: 24 }).setScrollFactor(0).setOrigin(0.5);
    }
    draw() {
        this.bgGraphics.clear();
        if (this.isEnabled) {
            this.bgGraphics.fillStyle(this.isMouseOver ? COLOR_BORDER_MOUSEOVER : COLOR_BORDER_NORMAL);
        } else {
            this.bgGraphics.fillStyle(COLOR_BORDER_DISABLED);
        }
        this.bgGraphics.fillRect(this.x, this.y, this.width, this.height).setScrollFactor(0);
        if (this.isEnabled) {
            this.bgGraphics.fillStyle(this.isMouseOver ? COLOR_FILL_MOUSEOVER : COLOR_FILL_NORMAL);
        } else {
            this.bgGraphics.fillStyle(COLOR_FILL_DISABLED);
        }
        this.bgGraphics.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10).setScrollFactor(0);
    }
    onClicked() {
        if (this.isEnabled) this.listener();
    }
    setListener(listener: () => void) {
        this.listener = listener;
    }
    setEnabled(newState:boolean) {
        this.isEnabled = newState;
    }
}

export {Button}