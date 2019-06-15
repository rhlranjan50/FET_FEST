const db = require('./database_service');
const Request = require('../models/request');

const REQUEST_DB = "requests";

const RequestService = {
    getAllRequests: function() {
        return new Promise((resolve, reject) => {
            db.collection(REQUEST_DB)
            .get()
            .then((querySnapshot) => {
                let requests = [];
                querySnapshot.forEach((doc) => {
                    let request = new Request(doc.data());
                    requests.push(request);
                });
                resolve(requests);
            })
            .catch((error) => {reject(error);});    
        });
    },
    getRequest: function(docRefId) {
        return new Promise((resolve, reject) => {
            db.collection(REQUEST_DB)
            .doc(docRefId)
            .get()
            .then((doc) => {
                if(doc.exists) {
                    resolve(doc.data());
                } else {
                    resolve("No Request data exists")
                }    
            })
            .catch((error) => reject(error));
        });
    },
    addRequest: function(data) {
        return new Promise((resolve, reject) => {
            db.collection(REQUEST_DB).add(data)
            .then((docRef) => {
                resolve({'docRefId': docRef.id})
            })
            .catch((error) => reject(error));
        });
    },
    completeRequest: function(docRefId) {
        return new Promise((resolve, reject) => {
            db.collection(REQUEST_DB)
            .doc(docRefId)
            .update({
                isPending: false
            })
            .then(() => resolve())
            .catch((error) => reject(error));
        });
    }
}

module.exports = RequestService;