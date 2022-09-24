import * as PIXI from 'pixi.js';
import {assets} from "../../assets/loader";

export class UI extends PIXI.Container {
    protected _spinStopButton: PIXI.Sprite;
    protected _spinNormal: PIXI.Texture;
    protected _spinOver: PIXI.Texture;
    protected _spinPressed: PIXI.Texture;
    protected _stopNormal: PIXI.Texture;
    public static STATE: string;
    public static SPIN_STATE: string = "SPIN_STATE";
    public static STOP_STATE: string = "STOP_STATE";

    constructor() {
        super();

        UI.STATE = UI.SPIN_STATE;

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
            if(UI.STATE === UI.SPIN_STATE) {
                this._spinStopButton.texture = this._spinPressed;
            } else {
                this._spinStopButton.texture = this._stopNormal;
            }
        }).on('pointerover', () => {
            if(UI.STATE === UI.SPIN_STATE) {
                this._spinStopButton.texture = this._spinOver;
            } else {
                this._spinStopButton.texture = this._stopNormal;
            }
        }).on('pointerout', () => {
            if(UI.STATE === UI.SPIN_STATE) {
                this._spinStopButton.texture = this._spinNormal;
            } else {
                this._spinStopButton.texture = this._stopNormal;
            }
        }).on('pointerup', () => {
            if(UI.STATE === UI.SPIN_STATE) {
                this._spinStopButton.texture = this._spinOver;
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