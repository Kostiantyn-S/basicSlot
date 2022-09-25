import * as PIXI from 'pixi.js';
import {assets} from "../../assets/loader";
import {ISymbol} from "./interfaces/ISymbol";
import {config} from "../config/config";

export class Symbol extends PIXI.Container implements ISymbol{
    protected _symbolImage: PIXI.Sprite;
    protected _symbols: Object;
    public id: number;

    constructor(id: number) {
        super();
        this.id = id;
        this._symbols = assets.symbols;
        this._symbolImage = PIXI.Sprite.from(this.getRandomTexture());
        this._symbolImage.width = config.symbolWidth;
        this._symbolImage.height = config.symbolHeight;
        this._symbolImage.y = this._symbolImage.height * this.id;
        this.addChild(this._symbolImage);
    }

    public getRandomTexture = (): string => {
        const keys = Object.keys(this._symbols);
        return assets.symbols[keys[Math.floor(Math.random() * keys.length)]];
    }

    public get symbolImage(): PIXI.Sprite {
        return this._symbolImage;
    }

    public getSymbolId(): string {
        return this._symbolImage.texture.baseTexture.cacheId.slice(3, 5);
    }
}