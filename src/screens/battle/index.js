import * as PIXI from 'pixi.js';

export default class Battle {
    constructor() {
    this._battle = false;
    this.app = new PIXI.Application({width:window.innerWidth, height:window.innerHeight});
    }

    render() {
        if(this._battle) {
        document.querySelector("#app").appendChild(this.app.view);
        } else {  
        }
    }

    update(state) {
        console.log('observer', state);
        this.render();
    }

    set status (value) {
        this._battle = value;
    }
}