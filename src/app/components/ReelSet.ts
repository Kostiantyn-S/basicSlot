import * as PIXI from 'pixi.js'
import {config} from "../config/config";
import {Reel} from "./Reel";
import TweenLite from 'gsap';
import {Globals} from "./Globals";

export class ReelSet extends PIXI.Container {
    protected reelsCount: number = config.reelsCount;
    protected _reelsArray: Array<Reel> = [];
    protected _canStopManually: boolean = false;

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
    }

    public startSpin(): void {
        this._canStopManually = false;
        let nextSpinDelay = 0;
        this._reelsArray.forEach((value, index) => {
            TweenLite.to(value, nextSpinDelay, {
                onComplete: () => {
                    (value as Reel).spin();
                }
            });
            if(index === 4) {
                TweenLite.to(this, nextSpinDelay, {
                   onComplete: () => {
                       this._canStopManually = true;
                   }
                });
            } else {
                nextSpinDelay += config.nextReelSpinDelay;
            }
        });
    }

    public stopManual(): void {
        if(this._canStopManually) {
            this._reelsArray.forEach((value) => {
                value.manualStop();
                value.stopSpin();
            });
            this._canStopManually = false;
        }
    }
}