import * as PIXI from "pixi.js";
import { App } from "../application";

export default class Row {
    constructor() {
        this.generation = false;
        this.battleContainer = {};
    }

    render() {
        if (this.generation === true) {
            this.generateRows(5,5);
        }
    }

    generateRows(columns, rows) {
        for (let i = 0; i < columns * rows; i++) {
             let tile = this.generateRandomTile('characters');
             tile = new PIXI.TilingSprite(tile.texture, 256, 256);
             tile.scale.set(0.4);
             tile.anchor.set(0.5);
             tile.x = (i % rows) * 100;
             tile.y = Math.floor(i / columns) * 100;
             this.battleContainer.addChild(tile);
        }


        this.battleContainer.x = App.screen.width / 1.7;
        this.battleContainer.y = App.screen.height / 2;
        this.battleContainer.pivot.x = this.battleContainer.width / 1.7;
        this.battleContainer.pivot.y = this.battleContainer.height / 2;


        window.onresize = e => {
            this.battleContainer.x = App.screen.width / 1.7;
            this.battleContainer.y = App.screen.height / 2;
            this.battleContainer.pivot.x = this.battleContainer.width / 1.7;
            this.battleContainer.pivot.y = this.battleContainer.height / 2;
        }
    }
     
    generateRandomTile(textureName) {
       let random = [];
       Object.keys(App.loader.resources).map((item, i) => {
            if(item.indexOf(textureName) !== -1) {
                random.push(App.loader.resources[item]);
            }        
       });
       return random[Math.round(Math.random() * (random.length - 1))];
    }

    update(store) {
        this.battleContainer = store.battleContainer.battleContainer;
        this.render();
    }
}