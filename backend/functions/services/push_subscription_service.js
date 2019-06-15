const db = require('./database_service');
const PushSubscription = require('../models/push-subscription');
const webpush = require('web-push');

const PUSHSUBSCRIPTION_DB = "push-subscription";
const message = "A person nearby you needs blood."
const vapidKeys = {
    "publicKey":"BBQxxXlyURTCuvPLGCAgeMhIObq54J-C-wHAOGJLYYVcjyrJ9cPPDZdgRxeARDBiWZE0YbOz8wGAtONKSa5b4K4",
    "privateKey":"wsSD6Rldg_Se5ZAz9AadvRz3NvF3CQRr_GYWq2yLYz4"
};
webpush.setVapidDetails(
    'mailto:rhlranjan50@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const PushSubscriptionService = {
    getPushSubscription: function(mobile) {
        return new Promise((resolve, reject) => {
            db.collection(PUSHSUBSCRIPTION_DB)
            .doc(mobile)
            .get()
            .then((doc) => {
                if(doc.exists) {
                    resolve(doc.data());
                } else {
                    resolve("User has not subscribed for Push Notification")
                }    
            })
            .catch((error) => reject(error));
        });
    },
    addPushSubscription: function(data) {
        return new Promise((resolve, reject) => {
            db.collection(PUSHSUBSCRIPTION_DB)
            .doc(data.mobile)
            .set(data.subscription)
            .then(() => resolve())
            .catch((error) => reject(error));
        });
    },
    schedulePushNotifications: function(mobile_numbers) {
        return new Promise((resolve, reject) => {
            let promises = [];
            mobile_numbers.forEach((mobile_number) => promises.push(PushSubscriptionService.getPushSubscription(mobile_number)));
            Promise.all(promises)
            .then((subscriptions) => {
                console.log(subscriptions);
                const notificationPayload = {
                    "notification": {
                        "title": "Emergency!",
                        "body": message,
                        "icon": "assets/main-page-logo-small-hat.png",
                        "vibrate": [100, 50, 100],
                        "data": {
                            "dateOfArrival": Date.now(),
                            "primaryKey": 1
                        },
                        "actions": [{
                            "action": "explore",
                            "title": "Open"
                        }]
                    }
                };
                let webpush_subscriptions = [];
                subscriptions.forEach((subscription) => {
                    if(typeof subscription !== "string") {
                        //UNCOMMENT BELOW
                        webpush_subscriptions.push(webpush.sendNotification(subscription, JSON.stringify(notificationPayload)));
                        //COMMENT OUT BELOW
                        //webpush_subscriptions.push(subscription);
                    }
                });
                return Promise.all(webpush_subscriptions);
            })
            .then((data) => {
                resolve("Push Notifications sent successfully", data);
            })
            .catch((reject) => reject(error)); 
        });
    }
}

module.exports = PushSubscriptionService;