import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  requestForm: FormGroup;
  private BloodGroup = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  private Ranges = [5, 10, 15];
  private uploadData;

  constructor(private fb: FormBuilder, private requestService: RequestService, private router:Router) {
    this.requestForm = this.fb.group({
      fcBloodGroup: ['', Validators.required],
      fcAddress: ['', Validators.required],
      fcRanges: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onFileComplete(data: any) {
    this.uploadData = data;
    console.log(data); // We just print out data bubbled up from event emitter.
  }

  createUUID() {
      // Public Domain/MIT
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";
  
      var uuid = s.join("");
      return uuid;
  }

  saveRequest(value) {
    let getInfo = JSON.parse(localStorage.getItem('digiBloodUser'));
    let req = {
      "blood_group": value.fcBloodGroup,
      "isPending": true,
      "status": {},
      "proof": "base64",
      "address_geopoint": getInfo.current_address_geopoint,
      "address_text": value.fcAddress,
      "id": this.createUUID(),
      "mobile": getInfo.mobile
    }
    this.requestService.createRequest(req).subscribe(result => {
      localStorage.setItem('requestId', req.id);
      this.router.navigate(['/request-status']);
    });
  }
}
