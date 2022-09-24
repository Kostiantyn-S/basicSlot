import * as PIXI from 'pixi.js';
import {assets} from "../../assets/loader";
import {Globals} from "./Globals";

export class UI extends PIXI.Container {
    protected _spinStopButton: PIXI.Sprite;
    protected _spinNormal: PIXI.Texture;
    protected _spinOver: PIXI.Texture;
    protected _spinPressed: PIXI.Texture;
    protected _stopNormal: PIXI.Texture;
    protected _state;

    constructor() {
        super();

        this._state = "stop";
        Globals.EMITTER.on("setStopState", () => {
            this._state = "stop";
            this._spinStopButton.texture = this._spinNormal;
        }, this).on("setSpinState", () => {
            this._state = "spin";
        }, this);

        this._spinNormal = PIXI.Texture.from(assets.spinButton.spinNormal);
        this._spinOver = PIXI.Texture.from(assets.spinButton.spinOver);
        this._spinPressed = PIXI.Texture.from(assets.spinButton.spinPressed);
        this._stopNormal = PIXI.Texture.from(assets.stopButton.stopNormal);

        this._spinStopButton = new PIXI.Sprite(this._spinNormal);
        this._spinStopButton.scale.set(0.5);
        this._spinStopButton.x = 540;
        this._spinStopButton.y = 600;

        //@ts-ignore
        this._spinStopButton.interactive = true;
        //@ts-ignore
        this._spinStopButton.buttonMode = true;
        //@ts-ignore
        this._spinStopButton.on('pointerdown', () => {
            if(this._state === "stop") {
                this._spinStopButton.texture = this._spinPressed;
            } else {
                this._spinStopButton.texture = this._stopNormal;
            }
        }).on('pointerover', () => {
            if(this._state === "stop") {
                this._spinStopButton.texture = this._spinOver;
            } else {
                this._spinStopButton.texture = this._stopNormal;
            }
        }).on('pointerout', () => {
            if(this._state === "stop") {
                this._spinStopButton.texture = this._spinNormal;
            } else {
                this._spinStopButton.texture = this._stopNormal;
            }
        }).on('pointerup', () => {
            if(this._state === "stop") {
                this._spinStopButton.texture = this._spinNormal;
            } else {
                this._spinStopButton.texture = this._stopNormal;
            }
        });

        this.addChild(this._spinStopButton);
    };

    public get spinStopButton(): PIXI.Sprite {
        return this._spinStopButton;
    }
}