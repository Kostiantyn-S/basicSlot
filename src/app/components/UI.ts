import * as PIXI from 'pixi.js';
import {assets} from "../../assets/loader";
import {GameEventEmitter} from "./emitter/GameEventEmitter";
import {MessageTypes} from "./emitter/MessageTypes";

export class UI extends PIXI.Container {
    protected _spinStopButton: PIXI.Sprite;
    protected _spinNormal: PIXI.Texture;
    protected _spinOver: PIXI.Texture;
    protected _spinPressed: PIXI.Texture;
    protected _stopNormal: PIXI.Texture;
    protected _state;
    protected _helpNormal: PIXI.Texture;
    protected _helpOver: PIXI.Texture;
    protected _helpPressed: PIXI.Texture;
    protected _helpButton: PIXI.Sprite;

    constructor() {
        super();
        this.prepareTextures();
        this.createButtons();
        this.addButtonsStateListeners();
        this._state = "stop";

        GameEventEmitter.EMITTER.on(MessageTypes.SET_STOP_STATE, () => {
            this._state = "stop";
            this._spinStopButton.texture = this._spinNormal;
        }, this).on(MessageTypes.SET_SPIN_STATE, () => {
            this._state = "spin";
        }, this);
    };

    public get spinStopButton(): PIXI.Sprite {
        return this._spinStopButton;
    }

    protected prepareTextures(): void {
        this._spinNormal = PIXI.Texture.from(assets.spinButton.spinNormal);
        this._spinOver = PIXI.Texture.from(assets.spinButton.spinOver);
        this._spinPressed = PIXI.Texture.from(assets.spinButton.spinPressed);
        this._stopNormal = PIXI.Texture.from(assets.stopButton.stopNormal);

        this._helpNormal = PIXI.Texture.from(assets.helpButton.helpNormal);
        this._helpOver = PIXI.Texture.from(assets.helpButton.helpOver);
        this._helpPressed = PIXI.Texture.from(assets.helpButton.helpPressed);
    }

    protected createButtons(): void {
        this._spinStopButton = new PIXI.Sprite(this._spinNormal);
        this._spinStopButton.scale.set(0.5);
        this._spinStopButton.x = 540;
        this._spinStopButton.y = 600;
        //@ts-ignore
        this._spinStopButton.interactive = true;
        //@ts-ignore
        this._spinStopButton.buttonMode = true;

        this._helpButton = new PIXI.Sprite(this._helpNormal);
        this._helpButton.scale.set(0.33);
        this._helpButton.x = 130;
        this._helpButton.y = 340;
        //@ts-ignore
        this._helpButton.interactive = true;
        //@ts-ignore
        this._helpButton.buttonMode = true;

        this.addChild(this._spinStopButton);
        this.addChild(this._helpButton);
    }

    protected addButtonsStateListeners(): void {
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

        //@ts-ignore
        this._helpButton.on('pointerdown', () => {
            this._helpButton.texture = this._helpPressed;
            GameEventEmitter.EMITTER.emit(MessageTypes.SWITCH_HELP);
        }).on('pointerover', () => {
            this._helpButton.texture = this._helpOver;
        }).on('pointerout', () => {
            this._helpButton.texture = this._helpNormal;
        }).on('pointerup', () => {
            this._helpButton.texture = this._helpOver;
        });
    }
}