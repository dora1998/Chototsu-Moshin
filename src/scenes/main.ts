import {PowerBar} from '../components/powerbar'
import { Button } from '../atoms/button';
import { ChakuchiGround } from '../components/chakuchi_ground';

const MAX_POWER = 100;
const SPEED_INIT = 40;
const GRAVITY = 10;
const XPOINT_CHANGE = 1800;

const WIDTH_PER_YEAR = 100;
const MAX_YEAR = 100;
const YEAR_START = 2020;

class MainScene extends Phaser.Scene {
    private power:number = 0;
    private powerBar:PowerBar;
    private player:Phaser.Physics.Arcade.Image;
    private jumpButton:Button;
    private ground_chakuchi:Phaser.Physics.Arcade.Image;

    init() {
        this.power = 0;
    }

    preload() {
        this.load.setBaseURL(BASE_URL);

        this.load.image('inoshishi', 'assets/img/inoshishi.png');

        this.load.image('ground-base', 'assets/img/ground-base.png');
        this.load.image('ground-jump', 'assets/img/ground-jump.png');
        this.load.image('ground-chakuchi', 'assets/img/ground-chakuchi.png');
    }

    // おもにゲームオブジェクト関連の初期化を行う
    create() {
        this.cameras.main.setBounds(0, 0, 2800 + 10000, 600);
        this.physics.world.setBounds(0, 0, 2800 + 10000, 600);

        var graphics = this.add.graphics();

        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(0, 0, 2800 + 10000, 600);
        
        this.player = this.physics.add.image(100, 450, 'inoshishi').setOrigin(0.5, 1);
        this.player.setCollideWorldBounds(true);
        
        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(-300, 0);

        this.powerBar = new PowerBar(this, 25, 25, MAX_POWER);
        this.input.on('pointerdown', () => this.increasePower());

        this.jumpButton = new Button(this, 500, 25, 150, 80, "ジャンプ");
        this.jumpButton.setListener(() => this.jump())

        this.createStage();

        this.player.setVelocityX(SPEED_INIT);
        this.player.setGravityY(GRAVITY);
    }

    // メインループ
    update() {
        
    }

    // 地面の作成
    createStage() {
        var group_base = this.physics.add.staticGroup();
        group_base.create(0, 600, 'ground-base').setOrigin(0, 1).refreshBody();
        group_base.create(2400, 600, 'ground-jump').setOrigin(0, 1).refreshBody();
        
        this.ground_chakuchi = this.physics.add.staticImage(2800, 600, 'ground-chakuchi').setOrigin(0, 1).setScale(10).refreshBody();

        for (let i = 2031; i <= (YEAR_START + MAX_YEAR); i += 12) {
            this.add.text(2800 + WIDTH_PER_YEAR * (i - YEAR_START + 0.5), 500, `${i}`, { font: '24px Arial', color: '#ffffff', align: 'center' }).setOrigin(0.5);
        }
        this.physics.add.collider(this.player, group_base);
        this.physics.add.collider(this.player, this.ground_chakuchi, this.onCollideGround);
        // this.physics.add.existing(new ChakuchiGround(this, 2800, 600), true);
    }

    increasePower() {
        if (this.player.x >= XPOINT_CHANGE) return;
        if (this.power >= MAX_POWER) return;
        this.power += 1;
        this.powerBar.updateBar(this.power)

        this.player.setAccelerationX(1 * this.power);
    }

    jump() {
        this.player.setVelocityY(-100);
    }

    onCollideGround(player, ground) {
        player.setVelocityX(0);
        player.disableBody(true, false);
    }
}

export {MainScene};