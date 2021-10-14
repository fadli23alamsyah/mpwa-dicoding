const baseUrl = `https://api.football-data.org/v2/`;
let klasemenEndpoint = `${baseUrl}competitions/2001/standings?standingType=TOTAL`;
let jadwalEndpoint = `${baseUrl}competitions/2001/matches?status=SCHEDULED`;
let timEndpoint = `${baseUrl}competitions/2001/teams`;
let timByIdEndpoint = `${baseUrl}teams/`;

let fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': `8d77e83d7fb24190ad210538704d6d8c`
        }
    });
};

function status(response) {
    if (response.status !== 200) {
        console.log(`Error : ${response.status}`);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log(`Error : ${error}`);
}

function getKlasemen(){
    if(`caches` in window){
        caches.match(klasemenEndpoint).then( response => {
            if(response){
                response.json().then( data => {
                    hasilKlasemenJSON(data);
                });
            }
        });
    }

    fetchApi(klasemenEndpoint)
    .then(status)
    .then(json)
    .then(data => {
        hasilKlasemenJSON(data);
    })
    .catch(error);
}

function getJadwal(){
    if(`caches` in window){
        caches.match(jadwalEndpoint).then( response => {
            if(response){
                response.json().then( data => {
                    hasilJadwalJSON(data);
                });
            }
        });
    }

    fetchApi(jadwalEndpoint)
    .then(status)
    .then(json)
    .then(data => {
        hasilJadwalJSON(data);
    })
    .catch(error);
}

function getTim(){
    if(`caches` in window){
        caches.match(timEndpoint).then( response => {
            if(response){
                response.json().then( data => {
                    hasilTimJSON(data);
                });
            }
        });
    }

    fetchApi(timEndpoint)
    .then(status)
    .then(json)
    .then(data => {
        hasilTimJSON(data);
    })
    .catch(error);
}

function getTimById(timId){
    return new Promise((resolve, reject) => {
        if(`caches` in window){
            caches.match(timByIdEndpoint+timId).then( response => {
                if(response){
                    response.json().then( data => {
                        hasilTimByIdJSON(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchApi(timByIdEndpoint+timId)
        .then(status)
        .then(json)
        .then(data => {
            hasilTimByIdJSON(data);
            resolve(data);
        })
        .catch(error);
    });
}