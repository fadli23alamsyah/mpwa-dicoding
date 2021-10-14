function hasilTimJSON(data){
    let dataTimHTML = ``;
    data.teams.forEach(tim => {
        let img = tim.crestUrl ? tim.crestUrl : `images/logo.png`;
        dataTimHTML += `
        <div class="col m4 s6">
            <div class="card">
                <div class="card-content">
                    <img src="${img}" alt="logo" width="70%" height="100px">
                    <h5 class="truncate">${tim.name}</h5>
                </div>
                <div class="card-action">
                    <a href="javascript:void(0)" style="margin-right:0" id="timfav${tim.id}" onclick="favorit(this, ${tim.id}, false)">Tambah Favorit</a>
                </div>
            </div>
        </div>`;
    });
    document.getElementById(`tim-content`).innerHTML = dataTimHTML;

    let fav = getAll();
    fav.then(tims => {
        tims.forEach(tim => {
            document.getElementById(`timfav${tim.id}`).setAttribute(`onclick`, `favorit(this, ${tim.id}, true)`);
            document.getElementById(`timfav${tim.id}`).innerText = `Hapus Favorit`;
        });
    });
}

function hasilTimByIdJSON(data){
    let img = data.crestUrl ? data.crestUrl : `images/logo.png`;
    let dataTimHTML = `
    <div class="col m4 s6">
        <div class="card">
            <div class="card-content">
                <img src="${img}" alt="logo" width="70%" height="100px">
                <h5 class="truncate">${data.name}</h5>
            </div>
            <div class="card-action">
                <a href="javascript:void(0)" style="margin-right:0" id="timfav${data.id}" onclick="favorit(this, ${data.id}, false)">Tambah Favorit</a>
            </div>
        </div>
    </div>`;
}