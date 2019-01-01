const COLOR_FILL_NORMAL = 0x55acee;
const COLOR_FILL_MOUSEOVER = 0x5ec0fc;

class ShareButton{
    private x:number;
    private y:number;
    private width:number;
    private height:number;
    private text:string;
    private isMouseOver = false;
    private score = 0;
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
        this.bgGraphics.fillStyle(this.isMouseOver ? COLOR_FILL_MOUSEOVER : COLOR_FILL_NORMAL);
        this.bgGraphics.fillRect(this.x, this.y, this.width, this.height).setScrollFactor(0);
    }
    onClicked() {
        let body = `${this.score}年まで猪突猛進しました！`;
        let hashtag = '猪突猛進';
        let siteUrl = 'https://dora1998.github.io/Chototsu-Moshin/';
        let url = `http://twitter.com/share?url=${encodeURIComponent(siteUrl)}&text=${encodeURI(body)}&hashtags=${encodeURI(hashtag)}`;
        window.open(url);
    }
    setScore(score:number) {
        this.score = score;
    }
}

export {ShareButton}