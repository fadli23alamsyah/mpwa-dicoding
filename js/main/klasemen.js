function hasilKlasemenJSON(data) {
    let tabelKlasemenHTML = ``;
    data.standings.forEach(function (klasemen) {
        let dataKlasemen = ``;
        klasemen.table.forEach(function (dataKlub) {
            dataKlasemen += `<tr>
                <td class="center-align">${dataKlub.position}</td>
                <td class="center-align">
                    <span class="hide-on-small-only">
                        <img src="${dataKlub.team.crestUrl}" alt="logo" width="20%">
                        <p class="center">${dataKlub.team.name}</p>
                    </span>
                    <p class="hide-on-med-and-up">
                        <img src="${dataKlub.team.crestUrl}" alt="logo" width="15%">
                    </p>
                </td>
                <td class="center-align">${dataKlub.playedGames}</td>
                <td class="center-align">${dataKlub.won}</td>
                <td class="center-align">${dataKlub.draw}</td>
                <td class="center-align">${dataKlub.lost}</td>
                <td class="center-align">${dataKlub.goalsFor}</td>
                <td class="center-align">${dataKlub.goalsAgainst}</td>
                <td class="center-align">${dataKlub.goalDifference}</td>
                <td class="center-align">${dataKlub.points}</td>
            </tr>`;
        });

        tabelKlasemenHTML += `
        <div class="card">
            <div class="card-content">
                <h5 class="header">${klasemen.group}</h5>
                <table class="responsive-table striped">
                    <thead>
                    <tr>
                        <th class="center-align">Position</th>
                        <th>Team</th>
                        <th class="center-align">Played</th>
                        <th class="center-align">Won</th>
                        <th class="center-align">Draw</th>
                        <th class="center-align">Lost</th>
                        <th class="center-align">GF</th>
                        <th class="center-align">GA</th>
                        <th class="center-align">GD</th>
                        <th class="center-align">Points</th>
                    </tr>
                    </thead>
                    <tbody>${dataKlasemen}</tbody>
                </table>
            </div>
        </div>`;
    });

    document.getElementById(`klasemen-content`).innerHTML = tabelKlasemenHTML;
}