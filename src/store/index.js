import Loading from "../components/loading";
import Login from "../screens/login";

export default class Store {
    constructor() {
        this.subscribes = [];
        this.loading = new Loading();
        this.login = new Login();
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