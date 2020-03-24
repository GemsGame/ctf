import Store from "../store";
const store = new Store();
store.subscribe(store.login);
store.subscribe(store.loading);
store.subscribe(store.preload);
store.subscribe(store.battle);

export default function listener() {

    document.addEventListener("click", event => {
        if (event.target.id === "start") {
            store.login.status = false;
            store.loading.loadingStatus = true;
            store.notify();
            store.preload.preload().then(data => {
                console.log(data);
                setTimeout(() => {
                    store.loading.loadingStatus = false;
                    store.battle.status = true;
                    store.notify();
                }, 1000);
            }).catch(data => {
               throw data;
            })
        }
    })

    store.login.render();
}

