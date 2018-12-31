/// <reference path="../phaser.d.ts"/>
import 'phaser'

import {SlideArea} from '../components/slidearea'

class MainScene extends Phaser.Scene {
    init() {
        console.log("init()");
    }

    preload() {
        console.log("preload()");
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

        var player = this.physics.add.image(100, 450, 'inoshishi').setOrigin(0.5, 1);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, platforms);
        
        this.cameras.main.startFollow(player);
        this.cameras.main.followOffset.set(400, 0);

        var slide_area = new SlideArea(this);

        player.setVelocityX(40);
    }

    // メインループ
    update() {
    }
}

export {MainScene};