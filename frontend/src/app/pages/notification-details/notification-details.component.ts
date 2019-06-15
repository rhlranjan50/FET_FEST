import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {

  user = { id: "1",
    firstName: "Ramesh",
    lastName: "Kumar",
    mobileNumber:"9854525562",
    address:"Pune",
    description:"description goes here"
  }
  
  constructor() { }

  ngOnInit() {
  }

}
