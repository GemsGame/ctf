import * as PIXI from "pixi.js";
import { App } from "../application";

export default class Row {
    constructor() {
        this.generation = false;
        this.battleContainer = {};
        this.arr = [
            [],
            [],
            [],
            [],
            []
        ];

    }

    render() {
        if (this.generation === true) {
   
          this.startGame();
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
    

    startGame () {
        this.generateRows(5, 5);
        this.genArr();
        this.findMoves();

        while(this.findClusters().length > 0) {
            this.battleContainer.removeChildren();
            this.generateRows(5, 5);
            this.genArr();
            this.findMoves();
        
        };


        
       
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


    genArr () {
        this.arr = [
            [],
            [],
            [],
            [],
            []
        ];

        let count = 0;
        for (let i = 0; i < this.battleContainer.children.length; i++) {
            if (i === 5 || i === 10 || i === 15 || i === 20) {
                count += 1;
            }
            this.arr[count].push(this.battleContainer.children[i]);
        }
    }
    findClusters() {
        //horisontal cluster 
  
        let clusterArr = [];
        for (var c = 0; c < this.arr.length; c++) {
            let clusters = 1;
            for (var r = 0; r < this.arr.length; r++) {
                if (r === this.arr.length - 1) {
                    if (clusters >= 3) {
                        //console.log('push cluster', clusters);
                        clusterArr.push({column: c, row:r + 1 - clusters,
                            length: clusters, horizontal: true });
                    }
                    clusters = 1;

                } else {
                    if (this.arr[c][r].texture.textureCacheIds[0] === this.arr[c][r + 1].texture.textureCacheIds[0]) {
                        clusters += 1;
                    } else {
                        // Different type
                        if (clusters >= 3) {
                            //console.log('push cluster', clusters);
                            clusterArr.push({column: c, row:r + 1 - clusters,
                                length: clusters, horizontal: true });
                        }
                        clusters = 1;
                    }
                }
            }
        }
        //find vartical clusters
        for (var c = 0; c < this.arr.length; c++) {
            let clusters = 1;
            for (var r = 0; r < this.arr.length; r++) {
                if (r === this.arr.length - 1) {
                    if (clusters >= 3) {
                        //console.log('push cluster', clusters);
                        clusterArr.push({column: c, row:r + 1 - clusters,
                            length: clusters, horizontal: false });
                    }
                    clusters = 1;

                } else {
                    if (this.arr[r][c].texture.textureCacheIds[0] === this.arr[r + 1][c].texture.textureCacheIds[0]) {
                        clusters += 1;
                    } else {
                        // Different type
                        if (clusters >= 3) {
                            //console.log('push cluster', clusters);
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
    
    findMoves () {
        let moves = [];
          // Check vertical swaps
        for (var c = 0; c < this.arr.length; c++) {
            for (var r = 0; r < this.arr.length - 1; r++) {

            
                this.swap(c,r, c, r + 1);
                let s = this.findClusters();
                this.swap(c,r, c, r + 1);

                if (s.length > 0) {
                    moves.push({column1: c, row1: r, column2: c, row2: r+1});
                    
                }

            }
        }
           // Check horizontal swaps
           for (var r = 0; r < this.arr.length; r++) {
            for (var c = 0; c < this.arr.length - 1; c++) {

                this.swap(c,r, c + 1, r);
                let s = this.findClusters();
                this.swap(c,r, c + 1, r);

                if (s.length > 0) {
                    moves.push({column1: c, row1: r, column2: c + 1, row2: r});
                   
                }
            }
        } 
       
        return moves;
    }
    
  
    swap(x1, y1, x2, y2) {
        var typeswap = this.arr[x1][y1].texture.textureCacheIds[0];
        this.arr[x1][y1].texture.textureCacheIds[0] = this.arr[x2][y2].texture.textureCacheIds[0];
        this.arr[x2][y2].texture.textureCacheIds[0] = typeswap;
    }

    
    update(store) {
        this.battleContainer = store.battleContainer.battleContainer; 
        this.render();
    }
}