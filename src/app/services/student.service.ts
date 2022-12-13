import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentCourses } from '../models/Mega';
import { Students } from '../models/models';
import { ObjectType } from '../models/ObjectType';
import { CustomHttpService } from './custom-http.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(public _customHttp: CustomHttpService) { }

  saveForm(student: Students) {
    debugger
    let url = 'api/Student/SaveForm';
    return this._customHttp.post(url, student);
  }
  getData(SearchQuery: string) {
    let url = 'api/Student/getData';
    return this._customHttp.get(url, { FName: SearchQuery });
  }
  GetStudentbyId(ID: number) {
    var student: Students;
    student = new Students;
    student.ID = ID;
    let url = 'api/Student/GetStudentbyId';
    return this._customHttp.get(url, { ID: ID });
  }
  Edit(std: StudentCourses) {
    debugger
    let url = 'api/Student/edit';
    return this._customHttp.post(url, std);

  }
  record_delete(ID: number) {
    debugger
    var student: Students;
    student = new Students;
    student.ID = ID;
    let url = 'api/Student/record_delete';
    return this._customHttp.post(url, { ID: ID });
  }
  // addcourse(AddCourse:Courses)
  // {
  //   debugger
  //   let url ='api/Student/addcourse';
  //   return this._customHttp.post(url, AddCourse);
  // }
  ObjectTypeFun(){
    let url = 'api/Student/Courses';
    return this._customHttp.get(url);
  }

}
