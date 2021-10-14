function hasilJadwalJSON(data){
    let dataJadwalHTML = ``;
    data.matches.forEach(dataJadwal => {
        let date = new Date(dataJadwal.utcDate);
        let tgl = `${(date.getDay()+1)}/${(date.getMonth()+1)}/${date.getFullYear()}  -  ${date.getHours()}:${date.getMinutes()}`;
        dataJadwalHTML += `
        <div class="card">
            <div class="card-content">
                <h5>Group ${dataJadwal.group}</h5>
                <p>Matchday ${dataJadwal.matchday}</p>
                <p>Kick Off : <b>${tgl}</b></p> <br>
                <div class="row">
                    <div class="col m4 s12"><h5>${dataJadwal.homeTeam.name}</h5></div>
                    <div class="col m4 s12"><h5>vs</h5></div>
                    <div class="col m4 s12"><h5>${dataJadwal.awayTeam.name}</h5></div>
                </div>
            </div>
        </div>`;
    });
    document.getElementById(`jadwal-content`).innerHTML = dataJadwalHTML;
}