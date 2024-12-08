import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allEmployee: any[], searchkey:string): any[] {
    
      let result:any[] = []
      //logic
      if(!allEmployee || searchkey == ""){
        return allEmployee
      }





        result = allEmployee.filter((item)=>item.status==searchkey)
        console.log(result)
        return result;

  
      // result = allEmployee.filter((item)=>item.name.toLowerCase().trim().includes(searchkey.toLowerCase().trim()))
      // return result;
  }

}
