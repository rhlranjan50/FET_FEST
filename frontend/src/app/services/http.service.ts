import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { log } from 'util';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private headers;
    private authToken = "token";
    private customObservable: Observable<any>;
    constructor(
        private httpClient: HttpClient,
        private _router: Router
    ) { }

    post(url: string, body, options?) {
        let httpOptions = {
            headers: new HttpHeaders().set('Authorization', this.authToken)
                .set('Content-Type', 'application/json')
        };
        if (options !== undefined) {
            httpOptions = options;
        }
        this.httpClient
            .post<any>(url, body, httpOptions).subscribe(data => {
                //this._router.navigate(['']);
            }, error => {
                return Observable.throw(error);
            });
    }

    get(url: string): Observable<any> {
        let httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        };
        console.log(url+"<<<<<,get url")
        return this.httpClient.get<any>(url, httpOptions);
        //return this.customObservable;

        // this.httpClient.get<any>(url, httpOptions).subscribe(data => {
        //   //this._router.navigate(['']);'
        //   return this.customObservable;
        // }, error => {
        //    return Observable.throw(error);
        // });
    }

    getWithParams(url: string, data: object) {

        let params = new HttpParams();
        params = params.append(data['key'], data['value']);

        let httpOptions = {
            headers: new HttpHeaders().set('Authorization', this.authToken)
                .set('Content-Type', 'application/json'),
            params: params
        };

        this.httpClient
            .get<any>(url, httpOptions).subscribe(data => {
                this._router.navigate(['']);
                return this.customObservable;
            }, error => {
                return Observable.throw(error);
            });
    }
}
