function Request(data) {
    this.id = data.id;
    this.address_geopoint = data.address_geopoint;
    this.address_text = data.address_text;
    this.blood_group = data.blood_group;
    this.isPending = data.isPending;
    this.mobile = data.mobile;
    this.proof = data.proof;
    this.description = data.description;
}

module.exports = Request;