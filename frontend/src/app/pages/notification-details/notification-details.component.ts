import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { log } from 'util';
import { MasterService } from 'src/app/services/master.service';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { Point } from 'src/app/models/point';


@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {

  @ViewChild('map', {static: false}) mapElement: any;
  map: google.maps.Map;

  showButtons : boolean = true;
  livetrackurl: string = "";

  user = {
    id: "1",
    firstName: "Ramesh",
    lastName: "Kumar",
    mobileNumber: "9854525562",
    address: "Pune",
    description: "description goes here"
  }

  donarRequestResponse : any = {};

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  constructor(
    private masterService: MasterService,
    private httpClient : HttpClient,
    private googleMapService: GoogleMapsService
  ) { }

  ngOnInit() {
    this.masterService.getRequest('/controller/api/v1/request/get/IhK8nEKELPSqIjG6uS6b')
    .subscribe((res: any)=>{
      if(res!=undefined && res.success){
        this.donarRequestResponse = res.data;
        let userData = JSON.parse(localStorage.getItem('digiBloodUser'));
        let destination = new Point(this.donarRequestResponse.address_geopoint._latitude, this.donarRequestResponse.address_geopoint._longitude);
        let source = new Point(userData.current_address_geopoint._latitude, userData.current_address_geopoint._longitude);
        this.livetrackurl = this.googleMapService.generateLiveDirectionURL(source,destination);
        this.map = this.googleMapService.generateMap(this.mapElement,[source,destination], source);
      } else {
        console.log("error");  
      }
    }, error => {
      console.log(error);
    });
  }

  acceptNotification() {    

      let userData = JSON.parse(localStorage.getItem('digiBloodUser'));
      log(userData);
      //userData.docRefId = resp.data.docRefId;

      var requestObj = {
        accepter_address_geopoint: userData.current_address_geopoint!=undefined ? userData.current_address_geopoint : {},
        accepter_address_text: userData.current_address_text,
        accepter_mobile: userData.mobile,
        accepter_name: userData.name,
        request_id: this.donarRequestResponse.id
      }
    
      this.httpClient.post('https://us-central1-digital-blood-bank-1c7f4.cloudfunctions.net/controller/api/v1/request_accepted/add', requestObj).subscribe((response: any) => {
        //log(response);
        if (response!=undefined && response.success) {
          this.showButtons = false;
          alert(response.message);
        } else {
          alert(response.message);
        }
      }, error => {
        alert("Acceptance failed");
      });
    }

}
