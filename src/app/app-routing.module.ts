import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './Components/student/student.component';
import { ViewStudentsComponent } from './Components/view-students/view-students.component';

const routes: Routes = [
  {
    path: "addstudent",
    component: StudentComponent,
  }, {
    path: "viewstudents",
    component: ViewStudentsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
