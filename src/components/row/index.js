import * as PIXI from "pixi.js";
import { App } from "../application";

export default class Row {
    constructor() {
        this.generation = false;
        this.battleContainer = {};
    }

    render() {
        if (this.generation === true) {
            this.generateRows();
        }
    }

    generateRows() {
        for (let i = 0; i < 25; i++) {
           //random algo here :)
            App.loader.resources.characters_0001 = new PIXI.TilingSprite(App.loader.resources.characters_0001.texture, 256, 256);
            App.loader.resources.characters_0001.scale.set(0.4);
            App.loader.resources.characters_0001.anchor.set(0.5);
            App.loader.resources.characters_0001.x = (i % 5) * 100;
            App.loader.resources.characters_0001.y = Math.floor(i / 5) * 100;
            this.battleContainer.addChild(App.loader.resources.characters_0001);
        }


        this.battleContainer.x = App.screen.width / 1.7;
        this.battleContainer.y = App.screen.height / 3;
        this.battleContainer.pivot.x = this.battleContainer.width / 1.7;
        this.battleContainer.pivot.y = this.battleContainer.height / 3;


        window.onresize = e => {
            this.battleContainer.x = App.screen.width / 1.7;
            this.battleContainer.y = App.screen.height / 3;
            this.battleContainer.pivot.x = this.battleContainer.width / 1.7;
            this.battleContainer.pivot.y = this.battleContainer.height / 3;
        }
    }

    update(store) {
        this.battleContainer = store.battleContainer.battleContainer;
        this.render();
    }
}