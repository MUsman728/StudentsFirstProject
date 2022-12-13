import { formatCurrency, NgIf } from '@angular/common';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {Students} from "./models/models";

import { StudentComponent } from './Components/student/student.component';
import { ViewStudentsComponent } from './Components/view-students/view-students.component';
import { SharedService } from './services/shared.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor (public _sharedService : SharedService,public _router:Router){

  }


ADDSTUDENT(){
  this._router.navigate(['/addstudent/']);
}
 

}
