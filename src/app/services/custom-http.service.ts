import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
// import 'rxjs/add/operator/catch';
import { map,catchError } from "rxjs/operators";

import { SharedService } from './shared.service';
import { Observable, pipe } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from "../../app/environments/environment";;

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {
  public baseUrl = environment.API_URL;

  public pendingRequests: number = 0; 
  public httpOptions:any;


  constructor(private _http: HttpClient,
    private _route: Router,
    public _sharedService: SharedService,
    private _router: Router) { }

  
    get(url: string, data?: any): Observable<any[]> {
    
    this.pendingRequests++;
    // console.log('get',this.pendingRequests);
    this._sharedService.loading = true;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token"),
      }),
      params: data
    };
    return this._http.get(this.baseUrl + url, this.httpOptions)
      .pipe(map((response: any) => {
        
        this.pendingRequests--;
        // console.log('get',this.pendingRequests);
        if (this.pendingRequests <= 0) {
          this.pendingRequests = 0;
          this._sharedService.loading = false;
        }
    
        return response;
      }))
      .pipe(catchError(e => {
        this.pendingRequests = 0;
        if (this.pendingRequests <= 0) {
        }
        this._sharedService.loading = false;
        if (e.status === 401) {
          this.pendingRequests=0;
          this._sharedService.loading = false;
          this.signout();
        }
        return throwError(e.error);
      }));
  }

  getWithoutLoader(url: string, data?: any): Observable<any[]> { 
    //this.pendingRequests++;
    // console.log('getWithoutLoader',this.pendingRequests); 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token"),
      }),
      params: data
    };
    return this._http.get(this.baseUrl + url, this.httpOptions)
    .pipe(map((response: any) => {
        //this.pendingRequests--;
        // console.log('getWithoutLoader',this.pendingRequests);
        if (this.pendingRequests <= 0) { 
          this.pendingRequests = 0;
          this._sharedService.loading = false;
        }
        return response;
      }))
      .pipe(catchError(e => {
        this.pendingRequests = 0;
        if (this.pendingRequests <= 0) {
          this.pendingRequests = 0;
          this._sharedService.loading = false;
        } 
        if (e.status === 401) {
          this.signout();
        }
        return throwError(e.error);
      }));
  }

  delete(url: string, data?: any): Observable<any[]> {
    this.pendingRequests++;
    // console.log('delete',this.pendingRequests);
    this._sharedService.loading = true;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token"),
      }),
      params: data
    };
    return this._http.delete(this.baseUrl + url, this.httpOptions)
    .pipe(map((response: any) => {
        this.pendingRequests--;
        // console.log('delete',this.pendingRequests);
        if (this.pendingRequests <= 0) {
          this.pendingRequests = 0;
          this._sharedService.loading = false;
        }
        return response;
      }))
      .pipe(catchError(e => {
        this.pendingRequests = 0;
        this._sharedService.loading = false;
        if (this.pendingRequests == 0) {
        }
        if (e.status === 401) {

          this.signout();
        }
        return throwError(e.error);
      }));
  }

  getWithoutHeader(url: string, data?: any): Observable<any[]> {
    this.pendingRequests++;
    // console.log('getWithoutHeader',this.pendingRequests);
    this._sharedService.loading = true;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token"),
      })
    };
    return this._http.get(this.baseUrl + url, this.httpOptions)
    .pipe(map((response: any) => {
        this.pendingRequests--;
        // console.log('getWithoutHeader',this.pendingRequests);
        if (this.pendingRequests <= 0) {
          this.pendingRequests = 0;
          this._sharedService.loading = false;
        }
        return response;
      }))
      .pipe(catchError(e => {
        this.pendingRequests = 0;
        this._sharedService.loading = false;
        if (this.pendingRequests <= 0) {
          
        }

        if (e.status === 401) {

          this.signout();
        }
        return throwError(e.error);
      }));
  }

  // getAutoScoreReport(url: string, data: any): Observable<any[]> {
  //   this.pendingRequests++;
  //   this._sharedService.loading = true;
  //   this.httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //     params: data
  //   };
  //   return this._http.get(environment.AUTO_SCORE_URL + url, this.httpOptions)
  //     .map((response: any) => {
  //       this.pendingRequests--;
  //       if (this.pendingRequests == 0) {
  //         this._sharedService.loading = false;
  //       }
  //       return response;
  //     })
  //     .catch(e => {
  //       this.pendingRequests--;
  //       this._sharedService.loading = false;
  //       if (this.pendingRequests == 0) {
  //       }
  //       if (e.status === 401) {

  //         this.signout();
  //       }
  //       return throwError(e.error);
  //     });
  // }

  postWithoutHeader(url: string, data: any): Observable<any[]> {
    this.pendingRequests++;
    // console.log('postWithoutHeader',this.pendingRequests);
    this._sharedService.loading = true;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(this.baseUrl + url, data, this.httpOptions)
    .pipe(map((response: any) => {
        this.pendingRequests--;
        // console.log('postWithoutHeader',this.pendingRequests);
        if (this.pendingRequests <= 0) {
          this.pendingRequests = 0;
          this._sharedService.loading = false;
        }
        return response;
      }))
      .pipe(catchError(e => {
        this.pendingRequests = 0;
        this._sharedService.loading = false;
        if (this.pendingRequests == 0) {
        }
        if (e.status === 401) {

          this.signout();
        }
        // return Observable.throw(e);
        return throwError(e.error);
      }));
  }

  post(url: string, data: any): Observable<any[]> {
    
    this.pendingRequests++;
    // console.log('post',this.pendingRequests);
    this._sharedService.loading = true;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token"),
      })
    };
    return this._http.post(this.baseUrl + url, data, this.httpOptions)
    .pipe(map((response: any) => {
        this.pendingRequests--;
        // console.log('post',this.pendingRequests);
        if (this.pendingRequests <= 0) {
          this.pendingRequests = 0;
          this._sharedService.loading = false;
        }
        return response;
      }),catchError(e => {
        this.pendingRequests = 0;
        this._sharedService.loading = false;
        if (this.pendingRequests == 0) {
        }
        if (e.status === 401) {

          this.signout();
        }
        return throwError(e.error);
      }))
      // .pipe(catchError(e => {
      //   this.pendingRequests = 0;
      //   this._sharedService.loading = false;
      //   if (this.pendingRequests == 0) {
      //   }
      //   if (e.status === 401) {

      //     this.signout();
      //   }
      //   return throwError(e.error);
      // }));
  }
  postWithoutLoader(url: string, data: any): Observable<any[]> {
    this.pendingRequests++;
    // console.log('postWithoutLoader',this.pendingRequests);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token"),
      })
    };
    return this._http.post(this.baseUrl + url, data, this.httpOptions)
    .pipe(map((response: any) => {
        this.pendingRequests--;
        // console.log('postWithoutLoader',this.pendingRequests);
        if (this.pendingRequests <= 0) {
          this.pendingRequests = 0;
          this._sharedService.loading = false;
        }
        return response;
      }))
      .pipe(catchError(e => {
        this.pendingRequests = 0;
        this._sharedService.loading = false;
        if (this.pendingRequests == 0) {
        }
        if (e.status === 401) {

          this.signout();
        }
        return throwError(e.error);
      }));
  }

  put(url: string, data: any): Observable<any[]> {
    this.pendingRequests++;
    // console.log('put',this.pendingRequests);
    this._sharedService.loading = true;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token"),
      })
    };
    return this._http.put(this.baseUrl + url, data, this.httpOptions)
    .pipe(map((response: any) => {
        this.pendingRequests--;
        // console.log('put',this.pendingRequests);
        if (this.pendingRequests <= 0) {
          this.pendingRequests = 0;
          this._sharedService.loading = false;
        }
        return response;
      }))
      .pipe(catchError(e => {
        this.pendingRequests = 0;
        this._sharedService.loading = false;
        if (this.pendingRequests == 0) {
        }
        if (e.status === 401) {

          this.signout();
        }
        return throwError(e.error);
      }));
  }
 
  resetPassword(url: string, data: any): Observable<any[]> {
    this.pendingRequests++;
    // console.log('resetPassword',this.pendingRequests);
    this._sharedService.loading = true;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("ResetToken"),
      })
    };
    return this._http.post(this.baseUrl + url, data, this.httpOptions)
    .pipe(map((response: any) => {
        this.pendingRequests--;
        // console.log('resetPassword',this.pendingRequests);
        if (this.pendingRequests <= 0) {
          this.pendingRequests = 0;
          this._sharedService.loading = false;
        }
        return response;
      }))
      .pipe(catchError(e => {
        this.pendingRequests = 0;
        this._sharedService.loading = false;
        if (this.pendingRequests == 0) {
        }
        if (e.status === 401) {

          this.signout();
        }
        return throwError(e.error);
      }));
  }

  signout() {
    // localStorage.removeItem("UserInfo");
    // this._route.navigate(['/']);
    // window.location.reload();

    localStorage.clear();
    // this._sharedService.is_logged_in = false;
    // this._sharedService.logged_user_role_id = undefined;
    // this._sharedService.logged_user_id = undefined;
    // this._sharedService.user_profile_image = undefined;
    // this._sharedService.user_profile_name = undefined;
    // this._sharedService.logged_user_account_id = undefined;
    // this._sharedService.token = undefined; 
    // this._sharedService.token = undefined;
    // this._sharedService.user = undefined;
    // this._sharedService.logged_user_id = undefined;
    // this._sharedService.logged_user_role = undefined;
    // this._sharedService.logged_user_role_id = undefined;
    // this._sharedService.currentWorkshopID = undefined;
    // this._sharedService.currentWorkshopName = undefined;
    // this._sharedService.EmployeeID = undefined;
    this.pendingRequests = 0;
    this._sharedService.loading = false;
    this._router.navigate(['/auth/login'])
  }
}

