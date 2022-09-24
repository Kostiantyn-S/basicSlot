import * as PIXI from 'pixi.js';
import {Background} from "./components/Background";
import {config} from "./config/config";
import {ReelSet} from "./components/ReelSet";
import {Graphics} from "pixi.js";
import {UI} from "./components/UI";
import {Globals} from "./components/Globals";

export class Game {
    protected app: PIXI.Application;
    protected back: Background;
    protected reelSet: ReelSet;
    protected ui: UI;
    protected _state: string;

    constructor(parent: HTMLElement) {
        this.app = new PIXI.Application({
            width: config.gameWidth,
            height: config.gameHeight,
            backgroundColor : 0x000000
        });

        window.addEventListener('resize', (event) => {
            this.onResize(event);
        });

        parent.replaceChild(this.app.view, parent.lastElementChild);
        this.registerPixiInspector();

        this._state = "stop";
        Globals.EMITTER.on("setStopState", () => {
            this._state = "stop";
        }, this).on("setSpinState", () => {
            this._state = "spin";
        }, this);

        this.back = new Background();
        this.app.stage.addChild(this.back.backgroundImage);
        this.app.stage.addChild(this.back.reelSetBackImage);

        this.reelSet = new ReelSet();
        this.app.stage.addChild(this.reelSet);
        this.setReelSetMask();

        this.ui = new UI();
        this.app.stage.addChild(this.ui);
        //@ts-ignore
        this.ui.spinStopButton.on('pointerdown', () => {
            if(this._state === "stop") {
                this.reelSet.startSpin();
                Globals.EMITTER.emit("setSpinState");
            }
        })

        this.onResize(null);
    }

    registerPixiInspector() {
        (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
    }

    setReelSetMask = () => {
        const _mask = new Graphics();
        _mask.beginFill(0xFF3300);
        _mask.drawRect(this.reelSet.x, this.reelSet.y + config.symbolHeight, this.reelSet.width, this.reelSet.height - config.symbolHeight);
        _mask.endFill();
        this.app.stage.addChild(_mask);
        this.reelSet.mask = _mask;
    }

    onResize = (event) => {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        if((window.innerWidth / config.gameWidth) > (window.innerHeight / config.gameHeight)) {
            this.app.stage.scale.set(window.innerHeight / config.gameHeight);
        } else {
            this.app.stage.scale.set(window.innerWidth / config.gameWidth);
        }
        this.app.stage.x = (window.innerWidth - this.app.stage.width) / 2;
        this.app.stage.y = (window.innerHeight - this.app.stage.height) / 2;
    }
}
