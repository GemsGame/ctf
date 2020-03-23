import "./app.scss";
import listener from "./observer";

document.addEventListener("DOMContentLoaded", ready);
function ready() {
    // app initialization
    document.querySelector('body').innerHTML = `
    <div id="app"></div>
    <div id="loader"></div>`;
    // add listener
    listener();
}


