const express = require('express');
const router = express.Router();
const httpStatus = require('http-status-codes');
const request_accepted_service = require('../services/request_accepted_service');
const responseUtils = require('../response_entity/response-entity');

router.get('/api/v1/request_accepted/:reqId', (request, response) => {
    let reqId = request.params.reqId;
    request_accepted_service.getRequestAcceptedByReqId(reqId)
    .then((data) => {
        response.status(httpStatus.OK)
        .jsonp(responseUtils.buildResponseSuccessDto(httpStatus.OK, 'OK', data));
    })
    .catch((error) => {
        response.status(httpStatus.BAD_REQUEST)
        .jsonp(responseUtils.buildResponseErrorDto(httpStatus.BAD_REQUEST, 'Error', error));
    })
});

router.post('/api/v1/request_accepted/add', (request, response) => {
    let request_accepted = request.body;
    request_accepted_service.acceptRequest(request_accepted)
    .then((data) => {
        response.status(httpStatus.CREATED)
        .jsonp(responseUtils.buildResponseSuccessDto(httpStatus.CREATED, 'Accepted request successfully', data));
    })
    .catch((error) => {
        response.status(httpStatus.BAD_REQUEST)
        .jsonp(responseUtils.buildResponseErrorDto(httpStatus.BAD_REQUEST, 'Error', error));
    })
});

module.exports = router;