import * as PIXI from 'pixi.js'
import {config} from "../config/config";
import {Reel} from "./Reel";
import TweenLite from 'gsap';

export class ReelSet extends PIXI.Container {
    protected reelsCount: number = config.reelsCount;
    protected _reelsArray: Array<Reel> = [];

    constructor() {
        super();


        let counter = 0;
        for (let i = 0; i < this.reelsCount; i++) {
            let reel = new Reel(counter);
            this._reelsArray.push(reel);
            this.addChild(reel);
            counter++;
        }

        this.x = (config.gameWidth - this.width) / 2;
        this.y = (config.gameHeight - this.height - 200) / 2;

        let nextSpinDelay = 0;
        this._reelsArray.forEach((value, index) => {
            TweenLite.to(value, nextSpinDelay, {
                onComplete: () => {
                    (value as Reel).spin();
                }
            });
            nextSpinDelay += config.nextReelSpinDelay;
        })
    }
}