import Loading from "../components/loading";
import Battle from "../components/battle";
import Login from "../screens/login";
import Preload from "../components/preload";

export default class Store {
    constructor() {
        this.subscribes = [];
        this.loading = new Loading();
        this.login = new Login();
        this.preload = new Preload();
        this.battle = new Battle();
    }


    notify() {
        this.notifyAll();
    }

    notifyAll() {
        return this.subscribes.forEach(subs => subs.update(this));
    }

    subscribe(observer) {
        this.subscribes.push(observer);
    }

    unSubscribe(observer) {
        this.subscribe = this.subscribe.filter(subs => subs !== observer)
    }
}