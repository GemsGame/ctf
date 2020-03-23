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

            setTimeout(() => {
                store.loading.loadingStatus = false;
                store.notify();  
            }, 3000); 
        }
    }) 

    store.login.render();
}

