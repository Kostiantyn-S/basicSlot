import * as PIXI from 'pixi.js';
import {assets} from "../../assets/loader";
import {config} from "../config/config";

export class Background {
    protected _backImage: PIXI.Sprite;

    constructor() {
        this._backImage = PIXI.Sprite.from(assets.back);
        this._backImage.width = config.gameWidth;
        this._backImage.height = config.gameHeight;
    }

    get backgroundImage(): PIXI.Sprite {
        return this._backImage;
    }
}