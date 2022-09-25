import * as PIXI from 'pixi.js';
import {assets} from "../../assets/loader";
import {config} from "../config/config";

export class Background extends PIXI.Container {
    protected _backImage: PIXI.Sprite;
    protected _reelSetBack: PIXI.Sprite;

    constructor() {
        super();
        this._backImage = PIXI.Sprite.from(assets.back);
        this._backImage.width = config.gameWidth;
        this._backImage.height = config.gameHeight;

        this._reelSetBack = PIXI.Sprite.from(assets.reelSetBack);
        this._reelSetBack.scale.set(0.33, 0.356);
        this._reelSetBack.x = 340;
        this._reelSetBack.y = 265;

        this.addChild(this._backImage);
        this.addChild(this._reelSetBack)
    }
}