import { Pipe, PipeTransform } from '@angular/core';
import { Students } from '../models/models';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(student:Students[] , IsDeleted: boolean ) 
  {
   if(student.length === 0)
   {
      return student
   }
   else
   {
     return student.filter((student)=> {return student.IsDeleted === IsDeleted})
   }
  }

}
