import * as PIXI from 'pixi.js';
import {Background} from "./components/Background";
import {config} from "./config/config";
import {ReelSet} from "./components/ReelSet";
import {Graphics} from "pixi.js";
import {UI} from "./components/UI";
import {GameEventEmitter} from "./components/emitter/GameEventEmitter";
import {Help} from "./components/Help";
import {MessageTypes} from "./components/emitter/MessageTypes";
import {Howl} from 'howler';
import {assets} from "../assets/loader";

export class Game {
    protected _app: PIXI.Application;
    protected _back: Background;
    protected _reelSet: ReelSet;
    protected _ui: UI;
    protected _state: string;
    protected _help: Help;
    protected _backgroundMusic: Howl;

    constructor() {
        this._app = new PIXI.Application({
            width: config.gameWidth,
            height: config.gameHeight,
            backgroundColor : 0x000000
        });

        window.addEventListener('resize', (event) => {
            this.onResize(event);
        });

        this.registerPixiInspector();

        this.addGameElements();
        this._state = "stop";

        GameEventEmitter.EMITTER.on(MessageTypes.SET_STOP_STATE, () => {
            this._state = "stop";
        }, this).on(MessageTypes.SET_SPIN_STATE, () => {
            this._state = "spin";
        }, this);

        //@ts-ignore
        this._ui.spinStopButton.on('pointerdown', () => {
            if(this._state === "stop") {
                GameEventEmitter.EMITTER.emit(MessageTypes.SET_SPIN_STATE);
                this._reelSet.startSpin();
            } else {
                this._reelSet.stopManual();
            }
        });

        GameEventEmitter.EMITTER.on(MessageTypes.SOUND_ON, () => {
            this._backgroundMusic.volume(1);
        }, this).on(MessageTypes.SOUND_OFF, () => {
            this._backgroundMusic.volume(0);
        }, this);
    }

    public setGame(parent: HTMLElement): void {
        parent.replaceChild(this._app.view, parent.lastElementChild);
        this._backgroundMusic.play();
    }

    registerPixiInspector() {
        (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
    }

    setReelSetMask = () => {
        const _mask = new Graphics();
        _mask.beginFill(0xFF3300);
        _mask.drawRect(this._reelSet.x, this._reelSet.y + config.symbolHeight, this._reelSet.width, this._reelSet.height - config.symbolHeight);
        _mask.endFill();
        this._app.stage.addChild(_mask);
        this._reelSet.mask = _mask;
    }

    onResize = (event) => {
        this._app.renderer.resize(window.innerWidth, window.innerHeight);
        if((window.innerWidth / config.gameWidth) > (window.innerHeight / config.gameHeight)) {
            this._app.stage.scale.set(window.innerHeight / config.gameHeight);
        } else {
            this._app.stage.scale.set(window.innerWidth / config.gameWidth);
        }
        this._app.stage.x = (window.innerWidth - this._app.stage.width) / 2;
        this._app.stage.y = (window.innerHeight - this._app.stage.height) / 2;
    }

    protected addGameElements(): void {
        this._back = new Background();
        this._app.stage.addChild(this._back);

        this._reelSet = new ReelSet();
        this._app.stage.addChild(this._reelSet);
        this.setReelSetMask();

        this._ui = new UI();
        this._app.stage.addChild(this._ui);

        this._help = new Help();
        this._app.stage.addChild(this._help);

        this._backgroundMusic = new Howl({
            src: [assets.backgroundMusic],
            loop: true,
            html5: true
        });

        this.onResize(null);
    }
}
