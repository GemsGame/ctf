import * as PIXI from 'pixi.js';
import { App } from "../application";

export default class Preload {
    constructor() {
        this.sprites = {};
    }
    preload() {

        App.loader.add('characters_0001', '../assets/characters/characters_0001.png', { crossOrigin: '' });
        App.loader.add('characters_0002', '../assets/characters/characters_0002.png', { crossOrigin: '' });
        App.loader.add('characters_0003', '../assets/characters/characters_0003.png', { crossOrigin: '' });
        App.loader.add('characters_0004', '../assets/characters/characters_0004.png', { crossOrigin: '' });
        App.loader.add('characters_0005', '../assets/characters/characters_0005.png', { crossOrigin: '' });
        App.loader.add('characters_0006', '../assets/characters/characters_0006.png', { crossOrigin: '' });
        App.loader.add('characters_0007', '../assets/characters/characters_0007.png', { crossOrigin: '' });
        
        return new Promise((resolve, reject) => {
            let errors = [];
            App.loader.load((loader, resources) => {
                Object.keys(resources).map((item, i) => {

                    this.sprites[resources[item].name] = new PIXI.TilingSprite(resources[item].texture, 256, 256);
                    
                    if (resources[item].error != null) {
                        errors.push(new Error('battle resourses not loaded...'));
                    };
                })
                if (errors.length > 0) {
                    reject(errors);
                }
                if (errors.length === 0) {
                    resolve('battle resourses loaded...100%');
                }
            });
        })
    }

    render() {

    }

    update(state) {
        console.log('observer', state);
        this.render();
    }



    set status(value) {
        this._battle = value;
    }
}