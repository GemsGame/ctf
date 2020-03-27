import * as PIXI from "pixi.js";
import { App } from "../application";

export default class Row {
    constructor() {
        this.generation = false;
        this.battleContainer = {};
    }

    render() {
        if (this.generation === true) {
            this.generateRows(5, 5);
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


        console.log(this.findClusters());


    }

    generateRandomTile(textureName) {
        let random = [];
        Object.keys(App.loader.resources).map((item, i) => {
            if (item.indexOf(textureName) !== -1) {
                random.push(App.loader.resources[item]);
            }
        });
        return random[Math.round(Math.random() * (random.length - 1))];
    }

    findClusters() {
        //horisontal cluster 
        let arr = [
            [],
            [],
            [],
            [],
            []
        ];
        
        let clusterArr = [];
        let count = 0;
        for (let i = 0; i < this.battleContainer.children.length; i++) {
            if (i === 5 || i === 10 || i === 15 || i === 20) {
                count += 1;
            }
            arr[count].push(this.battleContainer.children[i]);
        }

        for (var c = 0; c < arr.length; c++) {
            let clusters = 1;
            for (var r = 0; r < arr.length; r++) {
                if (r === arr.length - 1) {
                    if (clusters >= 3) {
                        console.log('push cluster', clusters);
                        clusterArr.push({column: c, row:r + 1 - clusters,
                            length: clusters, horizontal: true });
                    }
                    clusters = 1;

                } else {
                    if (arr[c][r].texture.textureCacheIds[0] === arr[c][r + 1].texture.textureCacheIds[0]) {
                        clusters += 1;
                    } else {
                        // Different type
                        if (clusters >= 3) {
                            console.log('push cluster', clusters);
                            clusterArr.push({column: c, row:r + 1 - clusters,
                                length: clusters, horizontal: true });
                        }
                        clusters = 1;
                    }
                }
            }
        }
        //find vartical clusters
        for (var c = 0; c < arr.length; c++) {
            let clusters = 1;
            for (var r = 0; r < arr.length; r++) {
                if (r === arr.length - 1) {
                    if (clusters >= 3) {
                        console.log('push cluster', clusters);
                        clusterArr.push({column: c, row:r + 1 - clusters,
                            length: clusters, horizontal: false });
                    }
                    clusters = 1;

                } else {
                    if (arr[r][c].texture.textureCacheIds[0] === arr[r + 1][c].texture.textureCacheIds[0]) {
                        clusters += 1;
                    } else {
                        // Different type
                        if (clusters >= 3) {
                            console.log('push cluster', clusters);
                            clusterArr.push({column: c, row:r + 1 - clusters,
                                length: clusters, horizontal: false });
                        }
                        clusters = 1;
                    }
                }
            }
        }

        return clusterArr;
    }



    update(store) {
        this.battleContainer = store.battleContainer.battleContainer;
        this.render();
    }
}