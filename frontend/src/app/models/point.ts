export class Point {
    public latitude: number;
    public longitude: number;

    constructor(lat, lng) {
        this.latitude = lat;
        this.longitude = lng;
    }

    toString() {
        return this.latitude + "," + this.longitude;
    }

    update(x,y) {
        return new Point(this.latitude + x, this.longitude + y);
    }
}