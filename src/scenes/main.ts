/// <reference path="../phaser.d.ts"/>
import 'phaser'

import {PowerBar} from '../components/powerbar'

const MAX_POWER = 100;
const SPEED_INIT = 40;
const GRAVITY = 10;
const XPOINT_CHANGE = 1800;

class MainScene extends Phaser.Scene {
    private power:number = 0;
    private powerBar:PowerBar;
    private player:Phaser.Physics.Arcade.Image;

    init() {
        this.power = 0;
    }

    preload() {
        this.load.setBaseURL('http://127.0.0.1:8080');

        this.load.image('inoshishi', 'assets/img/inoshishi.png');

        this.load.image('ground-base', 'assets/img/ground-base.png');
        this.load.image('ground-jump', 'assets/img/ground-jump.png');
    }

    // おもにゲームオブジェクト関連の初期化を行う
    create() {
        this.cameras.main.setBounds(0, 0, 2800, 600);
        this.physics.world.setBounds(0, 0, 2800, 600);

        var graphics = this.add.graphics();

        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(0, 0, 2800, 600);
        
        var platforms = this.physics.add.staticGroup();
        platforms.create(0, 600, 'ground-base').setOrigin(0, 1).refreshBody();
        platforms.create(2400, 600, 'ground-jump').setOrigin(0, 1).refreshBody();

        this.player = this.physics.add.image(100, 450, 'inoshishi').setOrigin(0.5, 1);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, platforms);
        
        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(-300, 0);

        this.powerBar = new PowerBar(this, 25, 25, MAX_POWER);
        this.input.on('pointerdown', () => this.increasePower());

        this.player.setVelocityX(SPEED_INIT);
        this.player.setGravityY(GRAVITY);
    }

    // メインループ
    update() {
        
    }

    increasePower() {
        if (this.player.x >= XPOINT_CHANGE) return;
        if (this.power >= MAX_POWER) return;
        this.power += 1;
        this.powerBar.updateBar(this.power)

        this.player.setVelocityX(SPEED_INIT + 1 * this.power);
    }
}

export {MainScene};