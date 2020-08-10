import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from "src/app/shared/interfaces/category.interface";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(adminCategory: Array<ICategory>, sortNameUA: boolean, sortNameEN: boolean, sortNumber: boolean, sortCount: number): unknown {
    if (sortNameUA == true) {
      return adminCategory.sort(function (a, b) {
        if (a.nameUA.toLowerCase() < b.nameUA.toLowerCase())
          return -1
      })
    }

    if (sortNameEN == true) {
      return adminCategory.sort(function (a, b) {
        if (a.nameEN.toLowerCase() < b.nameEN.toLowerCase())
          return -1
      })
    }

    if (sortNumber == true) {
      return adminCategory.sort(function (a, b) {
        if (a.id < b.id)
          return -1
      })
    }

    if (sortCount > 0) {
      return adminCategory.reverse()
    }

    else {
      return adminCategory
    }
    
  }
}
