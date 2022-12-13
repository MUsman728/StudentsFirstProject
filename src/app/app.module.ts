import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, NgForm} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './Components/student/student.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewStudentsComponent } from './Components/view-students/view-students.component';
// import { HomeComponent } from './Components/home/home.component';
import {Routes,RouterModule} from "@angular/router";
import { FilterPipe } from './pipes/filter.pipe';
import { CoursefilterPipe } from './pipes/coursefilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    ViewStudentsComponent,
    FilterPipe,
    CoursefilterPipe,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
