import { Injectable } from "@angular/core";
import { environment } from "../../app/environments/environment";
import { Students } from "../models/models";
// import { NotificationsService } from "angular2-notifications";
@Injectable({
  providedIn: "root",
})
export class SharedService {
    loading: boolean = false;
    API_URL: string = environment.API_URL;
Student:Students;


    constructor(
      // public _notificationService: NotificationsService
      ){

           this.Student = new Students();

      }

    // public success(title: string, message?: string) {
    //   this._notificationService.success(title, message);
    // }


    Edit(){
      this.Student = new Students();
    }
    
    // // error Type
    // error(title: string, message?: string) {
    //   this._notificationService.error(title, message);
    // }
  
    // warning(title: string, message?: string) {
    //   this._notificationService.warn(title, message);
    // }
  
    // info(title: string, message?: string) {
    //   this._notificationService.info(title, message);
    // }
}