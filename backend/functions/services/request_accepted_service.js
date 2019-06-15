const db = require('./database_service');
const RequestAccepted = require('../models/request-accepted');

const REQUESTACCEPTED_DB = "requests-accepted";

const RequestAcceptedService = {
    getRequestAcceptedByReqId: function(reqId) {
        return new Promise((resolve, reject) => {
            db.collection(REQUESTACCEPTED_DB)
            .where("request_id","==", reqId)
            .get()
            .then((querySnapshot) => {
                let array = [];
                querySnapshot.forEach((doc) => {
                    let request_accepted = new RequestAccepted(doc.data());
                    array.push(request_accepted);
                });
                resolve(array);
            })
            .catch((error) => {reject(error);});    
        });
    },
    acceptRequest: function(data) {
        return new Promise((resolve, reject) => {
            db.collection(REQUESTACCEPTED_DB).add(data)
            .then((docRef) => {
                resolve({'docRefId': docRef.id})
            })
            .catch((error) => reject(error));
        });
    }
}

module.exports = RequestAcceptedService;