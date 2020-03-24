import Loading from "../components/loading";
import Login from "../screens/login";
import Preload from "../components/preload";
import BattleContainer from "../components/battleContainer";
import Row from "../components/row";

export default class Store {
    constructor() {
        this.subscribes = [];
        this.loading = new Loading();
        this.login = new Login();
        this.preload = new Preload();
        this.battleContainer = new BattleContainer();
        this.row = new Row;
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