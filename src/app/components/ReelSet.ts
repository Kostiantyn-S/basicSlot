import * as PIXI from 'pixi.js'
import {config} from "../config/config";
import {Reel} from "./Reel";
import TweenLite from 'gsap';
import {GameEventEmitter} from "./emitter/GameEventEmitter";
import {MessageTypes} from "./emitter/MessageTypes";

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

        for (let i = 0; i < config.reelsCount; i++) {
            GameEventEmitter.EMITTER.on(MessageTypes.STOPPED_REEL_NUMBER_ + i, () => {
                if(this.isLastReelStopping()) {
                    TweenLite.to(this, 0.7, {
                        onComplete: () => {
                            GameEventEmitter.EMITTER.emit(MessageTypes.SET_STOP_STATE);
                        }
                    })
                }
            }, this);
        }
    }

    protected isLastReelStopping(): boolean {
        let stoppedReels = [];
        this._reelsArray.forEach((value) => {
            if(!value.spinning) {
                stoppedReels.push(value.id);
            }
        });
        if(stoppedReels.length === config.reelsCount - 1) {
            return true;
        } else {
            return false;
        }
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
            if(index === config.reelsCount - 1) {
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