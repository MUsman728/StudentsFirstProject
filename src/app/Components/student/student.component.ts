import { Component } from '@angular/core';
import { Students } from 'src/app/models/models';
import { SharedService } from 'src/app/services/shared.service';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObjectType } from 'src/app/models/ObjectType';
import { Courses } from 'src/app/models/Courses';
import { StudentCourses } from 'src/app/models/Mega';
import { elementAt } from 'rxjs';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  title = 'form';
  student: Students;
  userData: any[] = [];
  // isupdate:boolean = false;
  // rigister:string ='Register';
  // Update:string = 'Update';
  constructor(
    private _studentService: StudentService,
    public _sharedService: SharedService,
    public _router: Router,
    private modalService: NgbModal) {

    this.student = new Students();
    // this.ObjectType = new Array<ObjectType>();
    // this.tempCourse = new ObjectType();
  }
  coursesModal: any;

  // month:any[]=[{name: 'January'},
  //             {name:'Feburary'},
  //             {name: 'March'},
  //             {name:'April'},
  //             {name: 'May'},
  //             {name:'June'},
  //             {name: 'July'},
  //             {name:'August'},
  //             {name:'September'},
  //             {name:'October'},
  //             {name:'November'},
  //             {name:'December'}];
  saveForm() {
    debugger
    // this.userData.push(this.student)
    // console.log(this.userData);
    this._studentService.saveForm(this.student).subscribe(res => {
      console.log(res);
      // this._sharedService.success("Success", "Form Submitted")
    }), error => {
      // this._sharedService.error("Error", "Form Not Submitted");
    }

    this.student = new Students();

  }
  ObjectType: Array<ObjectType>;
  SelectedCourses:any=[];
  Courses : Array<Courses>;
  ObjectCourse: Courses;
  studentrecord: StudentCourses;
  ngOnInit(): void {
    // this.isupdate = this._sharedService.isupdate;
    this.student = this._sharedService.Student;
    this.ObjectType = new Array<ObjectType>();
    this.ObjectCourse = new Courses();
    this.Courses = new Array<Courses>();
    this.studentrecord = new StudentCourses();
    

  }
  Edit() {
    // debugger

    this.studentrecord.student = this.student;
    this.studentrecord.Courses = this.Courses;
    //this.student.courses = this.Courses.filter(item => item.IsChecked == true);
    this._studentService.Edit(this.studentrecord).subscribe((res) => {
      console.log(res);
    }), error => {
    }
    //this.student = new Students();
  }
  ObjectTypeFun(modal: any) {
    debugger
    this.coursesModal = this.modalService.open(modal, { size: 'lg', backdrop: false });
    this._studentService.ObjectTypeFun().subscribe((res:any) => {
      this.ObjectType = res;
      console.log(res);
      
    }), error => {
    }
    //this._router.navigate(['/objecttype/']);
  }




  onCheckboxChange(e:any,ObjectTypeId: any) {
    
    // this.ObjectType.forEach(myfunction);
    // function myfunction(item)
    // {
    //   if(this.ObjectTypeId === this.Courses.CourseTypeId)
    //   {
    //     this.ObjectType.IsChecked=true;
    //   }
    // }
   

      
    this.ObjectCourse.CourseTypeId=ObjectTypeId;
    this.ObjectCourse.StudentId=this.student.ID;
    
    if(e.target.checked)
    {
    this.Courses.push(this.ObjectCourse);
    }
    else
    {
      let index=this.Courses.indexOf(this.ObjectCourse);
      this.Courses.splice(index,1);
    }
   
     
    
    
    this.ObjectCourse = new Courses();

    
  }
  checkedBoxes()
  {
    // this.ObjectType.forEach(function (o) {
    //   this.Courses.forEach(function (c)
    //   {
    //     if(  this.o.ObjectTypeId == this.c.CourseTypeId){
    //     this.o.IsChecked == true;
    //     }
    //   })
    // })

    this.ObjectType.forEach(item =>{
      this.Courses.forEach(el =>{
        if(el.CourseTypeId == item.ObjectTypeId){
          item.IsChecked = true;
        }
        else{
          item.IsChecked = false;
        }
      })
    })

  }
  


    // if (e.target.checked) {
    //   this.Courses[index].IsChecked = true;
    // }
    // else
    // {
    //   this.Courses[index].IsChecked = false;
    // }

 
  // onChoosemonth(event:any){
  //   debugger
  //   this.student.expirationmonth = event.target.value;
  //   console.log(this.student.expirationmonth)
  //   this.onClear();
  // }
  // onClear(){
  //   this.student.expirationmonth = undefined;
  //   console.log(this.student.expirationmonth)
  // }
}







