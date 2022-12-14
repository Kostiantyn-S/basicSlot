import * as PIXI from 'pixi.js';
import {assets} from "../../assets/loader";
import {GameEventEmitter} from "./emitter/GameEventEmitter";
import {MessageTypes} from "./emitter/MessageTypes";
import TweenLite from "gsap";

export class Help extends PIXI.Container {
    protected line_0: PIXI.Sprite;
    protected line_1: PIXI.Sprite;
    protected line_2: PIXI.Sprite;
    protected winLinesCount: number;
    protected childrenArray: Array<PIXI.Sprite> = [];
    protected _helpBackground: PIXI.Sprite;

    constructor() {
        super();

        this._helpBackground = PIXI.Sprite.from(assets.helpBackground);
        this._helpBackground.scale.y = 1.8;
        this._helpBackground.alpha = 0;
        this.addChild(this._helpBackground);

        this.winLinesCount = Object.keys(assets.winLines).length;
        for (let i = 0; i < this.winLinesCount; i++) {
            this["line_" + i] = PIXI.Sprite.from(assets.winLines[i]);
            this.addChild(this["line_" + i]);
            this.childrenArray.push(this["line_" + i]);
        }

        this.scale.set(0.33, 0.356);
        this.x = 340;
        this.y = 265;

        this.childrenArray.forEach((value) => {
            value.alpha = 0;
        });

        GameEventEmitter.EMITTER.on(MessageTypes.SWITCH_HELP, this.switchHelp, this);
        GameEventEmitter.EMITTER.on(MessageTypes.SHOW_WIN_LINES, this.showWinLines, this);
    }

    protected showWinLines(linesArray: Array<boolean>, callBack: Function): void {
        let cbEmitted: boolean = false;

        linesArray.forEach((value, index, array) => {
            if(value) {
                TweenLite.to(this["line_" + index], 1, {
                    alpha: 1,
                    onComplete:() => {
                        TweenLite.to(this["line_" + index], 2, {
                            onComplete:() => {
                                TweenLite.to(this["line_" + index], 1, {
                                    alpha: 0,
                                    onComplete:() => {
                                        if(cbEmitted) return;
                                        callBack();
                                        cbEmitted = true;
                                    }
                                })
                            }
                        })
                    }
                });
            } else if(index === array.length - 1) {
                TweenLite.to(this, 0.5, {
                    onComplete:() => {
                        callBack();
                    }
                })
            }
        });
    }

    protected switchHelp(): void {
        this.childrenArray.forEach((value) => {
            value.alpha = value.alpha ? 0 : 1;
        });
        if(this._helpBackground.alpha) {
            this._helpBackground.alpha = 0;
            //@ts-ignore
            this._helpBackground.interactive = false;
        } else {
            this._helpBackground.alpha = 0.5;
            //@ts-ignore
            this._helpBackground.interactive = true;
        }
    }
}