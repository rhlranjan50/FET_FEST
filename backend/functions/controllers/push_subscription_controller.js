const express = require('express');
const router = express.Router();
const httpStatus = require('http-status-codes');
const push_subscription_service = require('../services/push_subscription_service');
const responseUtils = require('../response_entity/response-entity');

router.get('/api/v1/push_subscriptions/:mobile', (request, response) => {
    let mobile = request.params.mobile;
    push_subscription_service.getPushSubscription(mobile)
    .then((data) => {
        response.status(httpStatus.OK)
        .jsonp(responseUtils.buildResponseSuccessDto(httpStatus.OK, 'OK', data));
    })
    .catch((error) => {
        response.status(httpStatus.BAD_REQUEST)
        .jsonp(responseUtils.buildResponseErrorDto(httpStatus.BAD_REQUEST, 'Error', error));
    })
});

router.post('/api/v1/push_subscriptions/add', (request, response) => {
    let subscription = request.body;
    push_subscription_service.addPushSubscription(subscription)
    .then((data) => {
        response.status(httpStatus.CREATED)
        .jsonp(responseUtils.buildResponseSuccessDto(httpStatus.CREATED, 'Added new subscription successfully', data));
    })
    .catch((error) => {
        response.status(httpStatus.BAD_REQUEST)
        .jsonp(responseUtils.buildResponseErrorDto(httpStatus.BAD_REQUEST, 'Error', error));
    })
});

router.post('/api/v1/push_subscriptions/schedule', (request, response) => {
    let req = request.body;
    push_subscription_service.schedulePushNotifications(req.numbers)
    .then((data) => {
        response.status(httpStatus.OK)
        .jsonp(responseUtils.buildResponseSuccessDto(httpStatus.OK, 'OK', data));
    })
    .catch((error) => {
        response.status(httpStatus.BAD_REQUEST)
        .jsonp(responseUtils.buildResponseErrorDto(httpStatus.BAD_REQUEST, 'Error', error));
    })
});


module.exports = router;