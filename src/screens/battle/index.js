import * as PIXI from 'pixi.js';

export default class Battle {
    constructor() {
        this._battle = false;
        this.canvas = new PIXI.Application({ resizeTo: window, backgroundColor: 0x44d8f5 });
        this.sprites = {};
    }
    preload() {
        this.canvas.loader.add('characters_0001', '../assets/characters/characters_0001.png', { crossOrigin: '' });
        this.canvas.loader.add('characters_0002', '../assets/characters/characters_0002.png', { crossOrigin: '' });
        this.canvas.loader.add('characters_0003', '../assets/characters/characters_0003.png', { crossOrigin: '' });
        this.canvas.loader.add('characters_0004', '../assets/characters/characters_0004.png', { crossOrigin: '' });
        this.canvas.loader.add('characters_0005', '../assets/characters/characters_0005.png', { crossOrigin: '' });
        this.canvas.loader.add('characters_0006', '../assets/characters/characters_0006.png', { crossOrigin: '' });
        this.canvas.loader.add('characters_0007', '../assets/characters/characters_0007.png', { crossOrigin: '' });

        return new Promise((resolve, reject) => {
            let errors = [];
            this.canvas.loader.load((loader, resources) => {
                Object.keys(resources).map((item, i) => {
                    if (resources[item].error != null) {
                        errors.push(new Error('battle resourses not loaded...'));
                    };
                })
                if (errors.length > 0) {
                    reject(errors);
                }
                if (errors.length === 0) {
                    resolve();
                }
            });
        })
    }

    render() {
        if (this._battle) {
            document.querySelector("#app").appendChild(this.canvas.view);
        } else {
        }
    }

    update(state) {
        console.log('observer', state);
        this.render();
    }



    set status(value) {
        this._battle = value;
    }
}