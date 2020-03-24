

export default class Login {
    constructor() {
        this._status = true;
    }

    render() {
        if (this._status === true) {
        document.querySelector("#app").innerHTML = `
        <div class="login">
        <div class="login__logo">
        <img src="../assets/ui_assets/game_title_resize.png">
        </div>
        <div class="login__menu">
        <div class="login__pop-up-header">
        <img src="../assets/ui_assets/popup_header_2.png">
        </div>
        <div class="login__button-block">
        <div class="login__button-menu">
        <img src="../assets/ui_assets/button_info01.png">
        <img src="../assets/ui_assets/button_audioMute.png">
        </div>
        <div class="login__start-button">
        <p class="login__button-text">play</p>
        <img src="../assets/ui_assets/start_button.png" id="start">
        </div>
        </div>
        </div>
        </div>`
        } else {
          if(this._status === false && document.querySelector(".login")) {
            document.querySelector(".login").style.display = 'none';
          }
        }
    }
  
    set status (value) {
        this._status = value;
    }

    update(store) {
    console.log('observer', store)
    this.render();
    }


}