/// <reference path="./phaser.d.ts"/>

import './styles.scss';
import 'phaser';

import {MainScene} from './scenes/main'

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [
        MainScene
    ]
};

let game = new Phaser.Game(config);