function RequestAccepted(data) {
    this.accepter_address_geopoint = data.accepter_address_geopoint;
    this.accepter_address_text = data.accepter_address_text;
    this.accepter_mobile = data.accepter_mobile;
    this.accepter_name = data.accepter_name;
    this.request_id = data.request_id;
}

module.exports = RequestAccepted;