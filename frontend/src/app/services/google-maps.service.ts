import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {} from 'googlemaps';
import {Point} from '../models/point';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Accept': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private API_KEY: string = "AIzaSyD4HltFaS3fp1LiEIyq4_dv2ugJv2OrxCk";
  private reverseGeocodingUrl: string = "https://maps.googleapis.com/maps/api/geocode/json?latlng={0}&key="+this.API_KEY;
  private googleDirectionUrl: string = "https://www.google.com/maps/dir/?api=1&origin={0}&destination={1}&travelmode=driving"

  constructor(private http: HttpClient) { }

  generateLiveDirectionURL(source: Point, destination: Point) {
    let sourceDirection = source.toString();
    let destinationDirection = destination.toString();
    return this.googleDirectionUrl.replace("{0}", sourceDirection).replace("{1}", destinationDirection);
  }

  generatePlacesSearchBox(inputElement: any, map: google.maps.Map, callback: any) {
    let searchBox = new google.maps.places.SearchBox(inputElement.nativeElement);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputElement.nativeElement);
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
      let bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        console.log(place);
        callback(place.formatted_address);
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        markers.push(new google.maps.Marker({
          map: map,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

  generateMap(mapElement: any, positionArray: Point[], center: Point): google.maps.Map {
    const mapProperties = {
        center: new google.maps.LatLng(center.latitude, center.longitude),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let map = new google.maps.Map(mapElement.nativeElement, mapProperties);
    positionArray.forEach((point) => {
      new google.maps.Marker({'position': {lat: point.latitude, lng: point.longitude}, 'map': map})
    });
    return map;
  }

  getAddressFromLocation(position: Point) {
    let posString = position.toString();
    return this.http.get(this.reverseGeocodingUrl.replace("{0}", posString));
  }

  getDistanceFromLatLonInKm(p1: Point, p2: Point): string {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(p2.latitude-p1.latitude);  // deg2rad below
    var dLon = this.deg2rad(p2.longitude-p1.longitude); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(p1.latitude)) * Math.cos(this.deg2rad(p2.latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return p1.toString() +" " + p2.toString() +" " +d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}
