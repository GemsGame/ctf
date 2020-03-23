import "./index.scss";

export default class Loading {
  constructor() {
    this._loading = false;
    this.render();
  }

  render() {
    if (this._loading === true) {
      document.querySelector("#loader").style.display = "block";
      document.querySelector("#loader").innerHTML = `
        <div class="center">
        <div class="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>`;
     
    } else {
      if(this._loading === false && document.querySelector("#loader")) {
        document.querySelector("#loader").style.display = "none";
      }
    }
  }
 

  update(store) {
    console.log('observer', store)
    this.render();
  }

  set loadingStatus(value) {
    this._loading = value;
  }
}

