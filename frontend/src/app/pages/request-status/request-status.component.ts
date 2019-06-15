import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl,FormBuilder,FormGroup,FormsModule, FormGroupDirective, NgForm, Validators,AbstractControl,ValidatorFn,NG_VALIDATORS} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router} from "@angular/router";
import { DataService} from '../../services/data.service';
import { MasterService } from '../../services/master.service';
import { RequestService } from '../../services/request.service';

import {} from 'googlemaps';

import {GoogleMapsService} from '../../services/google-maps.service';
import {Point} from '../../models/point';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.css']
})
export class RequestStatusComponent implements OnInit {
locationRegisterForm: FormGroup;
  requestArray: [];
  userRegData = {};
  currentLocationLatLng: Point = new Point(0,0);
  displayedColumns: string[] = ['Name', 'Address', 'Contact'];
  dataSource = this.requestArray;

  @ViewChild('map', {static: false}) mapElement: any;
  @ViewChild('searchbox', {static: false}) inputElement: any;
  map: google.maps.Map;


  constructor(
    private fb: FormBuilder,
    private dataService :DataService,
    private masterService :MasterService,
    private googleMapsService: GoogleMapsService,
    private router : Router, 
    private requestService: RequestService
  ) {
  
    this.locationRegisterForm = fb.group({  
      'location' : [null, Validators.required]    
    });  
   }

  ngOnInit() {
    this.userRegData =  this.dataService.getTestData();
    this.findMyLocation();
    this.getRequest();
  }
  submit_locationRegister (form){
    let self = form;
    console.log(this.userRegData);
    if(self.valid && this.userRegData['userName']){
      if(this.currentLocationLatLng){
        let tempData = {
          "name":this.userRegData['userName'],
          "mobile":this.userRegData['mobileNo'],
          "blood_group":this.userRegData['bloodGroup'],
          "permanent_address_geopoint":{
            "_latitude":this.currentLocationLatLng.latitude,
            "_longitude":this.currentLocationLatLng.latitude,
          },        
            "current_address_text":this.inputElement.nativeElement.value,
            "permanent_address_text":this.inputElement.nativeElement.value,
            "current_address_geopoint":{
            "_latitude":this.currentLocationLatLng.latitude,
            "_longitude":this.currentLocationLatLng.latitude,
          },
              "status": {},
        }
        localStorage.setItem('digiBloodUser', JSON.stringify(tempData));
        this.masterService.userRegister(tempData)
        .subscribe(resp=>{
          if(resp && resp.code == 201){
            let userData = JSON.parse(localStorage.getItem('digiBloodUser'));
            userData.docRefId = resp.data.docRefId;
            userData.currentPage = "/test";
            localStorage.setItem('digiBloodUser', JSON.stringify(userData));
          console.log("user register Sucessfully==================>",tempData);
            this.router.navigate(['/request'])
          }else{
            console.log("Error in add user====================>",resp);
          }
        },error=>{
          console.log("Error in add user====================>");
        });
      }

    }else{
      let elements = self.controls;
      for (var key in elements) {
        if (elements.hasOwnProperty(key)) {
          elements[key].touched = true;
          console.log(key + " -> " + elements[key]);
        }
      }
    }
    
  }

  initGoogleMap() {
    this.map = this.googleMapsService.generateMap(
      this.mapElement,
      [],
      this.currentLocationLatLng
    );
  }

  initPlacesSearchBox() {
    this.googleMapsService.generatePlacesSearchBox(
      this.inputElement,
      this.map,
      () => {}
    )
  }

  findMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocationLatLng = new Point(position.coords.latitude, position.coords.longitude);
        this.initGoogleMap();
        this.initPlacesSearchBox();
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getRequest() {
    let getInfo = localStorage.getItem('requestId');
    this.requestService.getRequest(getInfo).subscribe((result: any) => {
      this.requestArray = result.data;
    });
  }
}

