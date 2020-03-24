import * as PIXI from 'pixi.js';
import { App } from "../application";


export default class BattleContainer {
    constructor() {
        this._status = false;
        this.battleContainer = new PIXI.Container();

    }

    render() {
        if (this._status === true) {
            document.querySelector("#app").appendChild(App.view);
            App.stage.addChild(this.battleContainer);
         
        }
    }

    update(state) {
        this.render();
    }



    set status(value) {
        this._status = value;
    }
}