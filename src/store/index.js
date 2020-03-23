import Loading from "../components/loading";
import Login from "../screens/login";
import Battle from "../screens/battle";

export default class Store {
    constructor() {
        this.subscribes = [];
        this.loading = new Loading();
        this.login = new Login();
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