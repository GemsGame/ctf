
export default class Battle {
    constructor() {
    this._battle = false;
    
    }

    render() {
        if(this._battle) {
        document.querySelector("#app").innerHTML = `<div class="battle">true</div`;
        } else {
        document.querySelector("#app").innerHTML = `<div class="battle">false</div`;  
        }
    }

    update(state) {
        console.log('observer', state);
        this.render();
    }
}