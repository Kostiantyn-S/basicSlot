import * as PIXI from 'pixi.js';
import {Background} from "./components/Background";
import {config} from "./config/config";

export class Game {
    private app: PIXI.Application;
    private back: Background;

    constructor(parent: HTMLElement) {
        this.app = new PIXI.Application({
            width: config.gameWidth,
            height: config.gameHeight,
            backgroundColor : 0x000000
        });

        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.app.stage.scale.x = window.innerWidth / config.gameWidth;
        this.app.stage.scale.y = window.innerHeight / config.gameHeight;
        window.addEventListener('resize', () => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight);
            this.app.stage.scale.x = window.innerWidth / config.gameWidth;
            this.app.stage.scale.y = window.innerHeight / config.gameHeight;
        });

        parent.replaceChild(this.app.view, parent.lastElementChild);
        this.registerPixiInspector();

        this.back = new Background();
        this.app.stage.addChild(this.back.backgroundImage);
    }

    registerPixiInspector() {
        (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ &&  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
    }
}
