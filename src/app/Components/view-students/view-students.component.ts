import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { find } from 'rxjs';
import { Students } from 'src/app/models/models';
import { SharedService } from 'src/app/services/shared.service';
import { StudentService } from 'src/app/services/student.service';
import {StudentCourses} from 'src/app/models/Mega';
@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent {
  Student:Students;
  StudentCourse:StudentCourses;
   Students:Array<Students>;
   SearchQuery:string;
  // arr:any =[];
  
  constructor(
    private _studentService: StudentService,
    public _sharedService: SharedService,
    public _router: Router) {
     
      this.Students = new Array<Students>();
  };
   
  searchbyFirstName()
  {
    debugger;
    this.getData();
  }



  getData()
  {
    debugger;
    this._studentService.getData(this.SearchQuery).subscribe(res => {

      this.Students = res;
      console.log(res);
    }), error => {
    }
  }
  ngOnInit()
  {
    this.getData();
    
  }
  GetStudentbyId(id:number)
  {
    debugger
    this._studentService.GetStudentbyId(id).subscribe(res =>
      {
          this.Students = res;
          console.log(res);
          this._router.navigate(['/addstudent/'])
      }), error => {}
  }
//   Edit(id: number)
//   {
//     this.GetStudentbyId(id);

//   }

Edit(std:Students){


this._sharedService.Student = std;
// this._sharedService.isupdate = true;
this._router.navigate(['/addstudent/']);
}

record_delete(ID:number)
{
  {
     
    debugger
    this._studentService.record_delete(ID).subscribe(res =>
      {
        console.log(res);
        let  index = this.Students.findIndex(item => item.ID === ID);
      
        // let arr:any =[];
        // this.arr.push(this.Students[index]
        this.Students[index].IsDeleted=true;
        // this.Students.splice(index,1);
        
        // this.Student.IsDeleted = true; 
        // let arr:any =[];
        // arr.push(this.Students[index])
        // console.log (this.arr);
      }), error => {}
  }


}

}
