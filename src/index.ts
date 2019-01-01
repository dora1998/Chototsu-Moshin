/// <reference path="./phaser.d.ts"/>

import './styles.scss';
import 'phaser';

import {MainScene} from './scenes/main'

var config = {
    type: Phaser.AUTO,
    scale: {
        width: 800,
        height: 600,
        scale: 'SHOW_ALL',
        orientation: 'LANDSCAPE'
    },
    parent: "game",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 10 }
        }
    },
    scene: [
        MainScene
    ]
};

// let game = new Phaser.Game(config);

function resize() {
    let canvas = document.querySelector("canvas");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let wratio = width / height;
    let ratio = config.scale.width / config.scale.height;
    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}

window.onload = () => {
    let game = new Phaser.Game(config);
    resize()
    window.addEventListener("resize",resize,false)
}