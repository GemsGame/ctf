import Store from "../store";
const store = new Store();
store.subscribe(store.login);
store.subscribe(store.loading);
store.subscribe(store.battle);

export default function listener() {

    document.addEventListener("click", event => {
        if (event.target.id === "start") {
            store.login.status = false;
            store.loading.loadingStatus = true;
            store.notify();
            store.battle.preload().then(data => {
                console.log("battle resourses loaded...100%");
                setTimeout(() => {
                    store.loading.loadingStatus = false;
                    store.battle.status = true;
                    store.notify();
                }, 2000);
            }).catch(data => {
               throw data;
            })
        }
    })

    store.login.render();
}

