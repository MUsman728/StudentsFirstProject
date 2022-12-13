import { Pipe, PipeTransform } from '@angular/core';
import { ObjectType } from '../models/ObjectType';

@Pipe({
  name: 'coursefilter',
  pure: false
})
export class CoursefilterPipe implements PipeTransform {

  transform(tempCourse: ObjectType[], IsChecked : boolean) {
    if(tempCourse.length === 0)
   {
      return tempCourse
   }
   else
   {
     return tempCourse.filter((course)=> {return course.IsChecked === IsChecked})
   }
  }

}
