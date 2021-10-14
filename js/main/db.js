let dbPromised = idb.open(`champions-db`,1, upgradeDb => {
    let timIndex = upgradeDb.createObjectStore(`tim-fav`, {
        keyPath: `id`
    });
    timIndex.createIndex(`nameTeam`,`name`,{
        unique: false
    });
});

function saveForLater(tim) {
    dbPromised.then(db => {
        console.log(db);
        let tx = db.transaction(`tim-fav`, `readwrite`);
        let store = tx.objectStore(`tim-fav`);
        store.put(tim);
        return tx.complete;
    })
    .then(() => {
        console.log(`Berhasil di simpan.`);
    });
}

function getAll() {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            let tx = db.transaction(`tim-fav`, `readonly`);
            let store = tx.objectStore(`tim-fav`);
            return store.getAll();
        })
        .then(timfav => {
            resolve(timfav);
        });
    });
}

function getSavedTims(){
    getAll().then(tims => {
        let timsHtml = ``;
        tims.forEach(tim => {
            let img = tim.crestUrl ? tim.crestUrl : `images/logo.png`;

            timsHtml += `
            <div class="col m4 s6">
                <div class="card">
                    <div class="card-content">
                        <img src="${img}" alt="logo" width="70%" height="100px">
                        <h5 class="truncate">${tim.name}</h5>
                    </div>
                    <div class="card-action">
                        <a href="javascript:void(0)" style="margin-right:0" id="timfav${tim.id}" onclick="favorit(this, ${tim.id}, true)">Hapus Favorit</a>
                    </div>
                </div>
            </div>`;
        });
        timsHtml = timsHtml ? timsHtml : `Tidak ada data`;
        document.getElementById(`favorit-tim-content`).innerHTML = timsHtml;
    });
}

function deleteFav(id){
    dbPromised.then(db => {
        let tx = db.transaction(`tim-fav`, `readwrite`);
        let store = tx.objectStore(`tim-fav`);
        store.delete(id);
        return tx.complete;
    }).then(() => {
        console.log(`Berhasil di hapus.`);
        location.reload();
    });
}