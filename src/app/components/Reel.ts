import * as PIXI from 'pixi.js';
import {config} from "../config/config";
import {IReel} from "./interfaces/IReel";
import {Symbol} from "./Symbol";
import TweenLite from 'gsap';
import {GameEventEmitter} from "./emitter/GameEventEmitter";
import {MessageTypes} from "./emitter/MessageTypes";

export class Reel extends PIXI.Container implements IReel{
    protected linesCount: number;
    public id: number;
    protected tween: TweenLite;
    protected symbols: Array<Symbol> = [];
    public spinning: boolean;

    constructor(id: number) {
        super();
        this.linesCount = config.linesCount + config.additionalLinesCount;
        this.id = id;
        this.x = config.symbolWidth * this.id;

        let counter = 0;
        for (let i = 0; i < this.linesCount; i++) {
            let symbol = new Symbol(counter);
            this.symbols.push(symbol);
            this.addChild(symbol);
            counter++;
        }

        this.spinning = false;
    }

    public spin (): void {
        this.spinning = true;
        this.tween = TweenLite.to(this, config.spinTime, {
            onUpdate: this.updateScrolling,
            onComplete: this.finishSpin
        });
    }

    updateScrolling = () => {
        this.y += 20;
        this.updateSymbolsTextures();
    }

    updateSymbolsTextures = () => {
        if(this.y >= config.symbolHeight) {
            this.y = 0;

            this.symbols[3].symbolImage.texture = this.symbols[2].symbolImage.texture.clone();
            this.symbols[2].symbolImage.texture = this.symbols[1].symbolImage.texture.clone();
            this.symbols[1].symbolImage.texture = this.symbols[0].symbolImage.texture.clone();
            this.symbols[0].symbolImage.texture = PIXI.Texture.from(this.symbols[0].getRandomTexture());
        }
    }

    finishSpin = () => {
        this.tween = TweenLite.to(this, config.spinStoppingTime, {
            onUpdate: this.updateFinishScrolling,
            onComplete: this.stopSpin
        });
    }

    updateFinishScrolling = () => {
        let progress = this.tween.progress();

        switch (Math.floor(progress * 10)) {
            case 0:
                this.y += 20;
                break;
            case 1:
                this.y += 18;
                break;
            case 2:
                this.y += 16;
                break;
            case 3:
                this.y += 14;
                break;
            case 4:
                this.y += 12;
                break;
            case 5:
                this.y += 10;
                break;
            case 6:
                this.y += 8;
                break;
            case 7:
                this.y += 6;
                break;
            case 8:
                this.y += 4;
                break;
            case 9:
                this.y += 2;
                break;
        }
        this.updateSymbolsTextures();
    }

    stopSpin = () => {
        let duration = this.y/50;
        TweenLite.to(this, duration, {
            y: 0,
            onComplete: () => {
                this.spinning = false;
                GameEventEmitter.EMITTER.emit(MessageTypes.STOPPED_REEL_NUMBER_ + this.id);
            }
        });
    }

    public manualStop(): void {
        if(this.tween) {
            this.tween.kill();
        }
    }

    public getReelSymbolsIds(): Array<string> {
        let symbolsIds = [];
        this.symbols.forEach((value) => {
            symbolsIds.push(value.getSymbolId());
        });
        return symbolsIds;
    }
}