document.addEventListener(`DOMContentLoaded`, () => {
    let page = window.location.hash.substr(1);
});
function favorit(btnFav, timId, isFav){
    if(isFav){
        M.toast({ html: `Berhasil di hapus.`});
        deleteFav(timId);
    }else{
        btnFav.setAttribute(`onclick`, `favorit(this, ${timId}, true)`);
        btnFav.innerText = `Hapus Favorit`;
        let item = getTimById(timId);
        item.then(function (tim) {
            saveForLater(tim);
        });
        M.toast({ html: `Berhasil di tambah.`});
    }
}

if (!(`serviceWorker` in navigator)) {
    console.error(`ServiceWorker: Browser tidak mendukung.`);
} else {
    registerServiceWorker();
    requestPermission();
}

function registerServiceWorker(){
    return navigator.serviceWorker
    .register(`/service-worker.js`)
    .then(registration => {
        console.log(`ServiceWorker: Pendaftaran berhasil.`);
        return registration;
    })
    .catch(error => {
        console.error(`ServiceWorker: Pendaftaran gagal. Error:`, error);
    });
}

function requestPermission(){
    if (`Notification` in window) {
        Notification.requestPermission().then(result => {
            if (result === `denied`) {
                console.log(`Fitur notifikasi tidak diijinkan.`);
                return;
            } else if (result === `default`) {
                console.error(`Pengguna menutup kotak dialog permintaan ijin.`);
                return;
            }

            function urlBase64ToUint8Array(base64String) {
                const padding = `=`.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding)
                    .replace(/-/g, `+`)
                    .replace(/_/g, `/`);
                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);
                for (let i = 0; i < rawData.length; ++i) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            }
            
            if ((`PushManager` in window)) {
                navigator.serviceWorker.getRegistration().then(registration => {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(`BKx54WJq8xx1Yk1QI9ICstnuw4PqsbqiV5zYdyCRtcreTBd23sUYYA4YExZL2awDzH-50qJNOT-Cwf_7ofiC6Pg`)
                    }).then(subscribe => {
                        console.log(`Berhasil melakukan subscribe dengan endpoint: `, subscribe.endpoint);
                        console.log(`Berhasil melakukan subscribe dengan p256dh key: `, btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey(`p256dh`)))));
                        console.log(`Berhasil melakukan subscribe dengan auth key: `, btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey(`auth`)))));
                    }).catch(e => {
                        console.error(`Tidak dapat melakukan subscribe `, e.message);
                    });
                });
            }
        });
    }
}