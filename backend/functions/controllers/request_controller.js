const express = require('express');
const router = express.Router();
const httpStatus = require('http-status-codes');
const request_service = require('../services/request_service');
const responseUtils = require('../response_entity/response-entity');

router.get('/api/v1/request/requests', (request, response) => {
    request_service.getAllRequests()
    .then((data) => {
        response.status(httpStatus.OK)
        .jsonp(responseUtils.buildResponseSuccessDto(httpStatus.OK, 'OK', data));
    })
    .catch((error) => {
        response.status(httpStatus.BAD_REQUEST)
        .jsonp(responseUtils.buildResponseErrorDto(httpStatus.BAD_REQUEST, 'Error', error));
    })
});

router.get('/api/v1/request/get/:docRefId', (request, response) => {
    let docRefId = request.params.docRefId;
    request_service.getRequest(docRefId)
    .then((data) => {
        response.status(httpStatus.OK)
        .jsonp(responseUtils.buildResponseSuccessDto(httpStatus.OK, 'OK', data));
    })
    .catch((error) => {
        response.status(httpStatus.BAD_REQUEST)
        .jsonp(responseUtils.buildResponseErrorDto(httpStatus.BAD_REQUEST, 'Error', error));
    })
});

router.post('/api/v1/request/add', (request, response) => {
    let donor_request = request.body;
    request_service.addRequest(donor_request)
    .then((data) => {
        response.status(httpStatus.CREATED)
        .jsonp(responseUtils.buildResponseSuccessDto(httpStatus.CREATED, 'Added new donor request successfully', data));
    })
    .catch((error) => {
        response.status(httpStatus.BAD_REQUEST)
        .jsonp(responseUtils.buildResponseErrorDto(httpStatus.BAD_REQUEST, 'Error', error));
    })
});

router.post('/api/v1/request/complete', (request, response) => {
    let donor_request_docRef = request.body;
    request_service.completeRequest(donor_request_docRef.docRefId)
    .then((data) => {
        response.status(httpStatus.OK)
        .jsonp(responseUtils.buildResponseSuccessDto(httpStatus.OK, 'Request completed successfully', data));
    })
    .catch((error) => {
        response.status(httpStatus.BAD_REQUEST)
        .jsonp(responseUtils.buildResponseErrorDto(httpStatus.BAD_REQUEST, 'Error', error));
    })
});

module.exports = router;