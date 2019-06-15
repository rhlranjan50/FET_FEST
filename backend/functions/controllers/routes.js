const user_controller = require('./user_controller');
const request_controller = require('./request_controller');
const request_accepted_controller = require('./request_accepted_controller');

module.exports = function (app) {
    
    //user api -- BEGIN
    app.get('/api/v1/user/users', user_controller);
    app.post('/api/v1/user/location', user_controller);
    app.post('/api/v1/user/add', user_controller);
    //user api -- END
    
    //request api -- BEGIN
    app.get('/api/v1/request/get/:docRefId', request_controller);
    app.get('/api/v1/request/requests', request_controller);
    app.post('/api/v1/request/add', request_controller);
    app.post('/api/v1/request/complete', request_controller);
    //request api -- END
    
    //request accepted api -- BEGIN
    app.get('/api/v1/request_accepted/:reqId', request_accepted_controller);
    app.post('/api/v1/request_accepted/add', request_accepted_controller);
    //request accepted api -- END
};
