import * as PIXI from 'pixi.js';
import {App} from "../application";


export default class Battle {
    constructor() {
    this._status = false;
    this.sprites = {};
    }

    render() {
       if(this._status === true) {
       document.querySelector("#app").appendChild(App.view);
       this.sprites.characters_0001.anchor.set(0.5);
       this.sprites.characters_0001.scale.set(0.5);
       this.sprites.characters_0001.x = App.screen.width / 2;
       this.sprites.characters_0001.y = App.screen.height / 2;
       App.stage.addChild(this.sprites.characters_0001);


       window.onresize = e => {
        this.sprites.characters_0001.x = App.screen.width / 2;
        this.sprites.characters_0001.y = App.screen.height / 2;
       }
       }
    }

    update(state) {
        this.sprites = state.preload.sprites;
        this.render();
    }



    set status(value) {
        this._status = value;
    }
}