import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { log } from 'util';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {

  showButtons : boolean = true;

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
    private httpClient: HttpClient,
    private masterService: MasterService,
  ) { }

  ngOnInit() {
    this.masterService.getRequest('/controller/api/v1/request/get/IhK8nEKELPSqIjG6uS6b')
    .subscribe(res=>{
        
      if(res.success){
        this.donarRequestResponse = res.data;
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
    
      this.httpClient.post('https://us-central1-digital-blood-bank-1c7f4.cloudfunctions.net/controller/api/v1/request_accepted/add', requestObj).subscribe(response => {
        //log(response);
        if (response.success) {
          this.showButtons = false;
          alert(response.message);
        } else {
          alert(response.message);
        }
      }, error => {
        alert("Acceptance failed");
      });
    }
    rejectNotification(){
    
      var requestObj = {
    
      }
    
      this.httpClient.post('/api/v1/request_accepted/add HTTP/1.1', requestObj).subscribe(response => {
        if (response.isSuccess) {
          alert();
        } else {
          alert();
        }
      });
     console.log("Notification accepted");
    }

}
