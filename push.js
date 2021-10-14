var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BKx54WJq8xx1Yk1QI9ICstnuw4PqsbqiV5zYdyCRtcreTBd23sUYYA4YExZL2awDzH-50qJNOT-Cwf_7ofiC6Pg",
    "privateKey": "89uNKNVFPLAaX_oemnUyzCDJdgUl6cNNjMEfP_RvaKg"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cwNu3mxTwH8:APA91bG2IhHeqDTjsYhdV1l4HFrn4dVB-i_rtctA-TxSbJp2iKwRH-oIRGHaXG5yThfzjQC92-9s8liiEp87NyMGObkzvQptBITU13cRAEd72077JjpihLx6-O_TWsATZY_Kcfk4H5gj",
    "keys": {
        "p256dh": "BA8Aw4XRfCrFj2CB4SHeQV9zZh9P2Lm7eX2PE/rKclw2SFNJ++O0jheVTcKqz7ryCHwHcsJ/TFCRf2vvcTsS8HU=",
        "auth": "p6uZ+tgIKVufs0eZTRfXrQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '1059971903909',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);