var request = require('request');  // npm install request

const KEY = 'OCCpi1svNndL9Z5S0lR-IgXH';
const SECRET = 'vJLp&&%1NMP7IE22rj.7cyflx)UEAP5rhj.Ko%j4';
const SENDER = 'DIGITAL BLOOD BANK';

const SMSService = {
    scheduleSMSDelivery: function(message, mobile) {
        request.post({
            url: 'https://gatewayapi.com/rest/mtsms',
            oauth: {
                consumer_key: KEY,
                consumer_secret: SECRET,
            },
            json: true,
            body: {
                sender: SENDER,
                message: message,
                recipients: [{msisdn: mobile}],
            },
        }, function (err, r, body) {
            console.log(err ? err : body);
        });
    }
}

module.exports = SMSService;