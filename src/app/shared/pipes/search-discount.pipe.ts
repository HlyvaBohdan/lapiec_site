import { Pipe, PipeTransform } from '@angular/core';
import { IBlog } from "src/app/shared/interfaces/blog.interface";

@Pipe({
  name: 'searchDiscount'
})
export class SearchDiscountPipe implements PipeTransform {
  transform(adminDiscountArray: Array<IBlog>, nameDiscount: string): unknown {
    if (!adminDiscountArray) {
      return null;
    }
    if (!nameDiscount) {
      return adminDiscountArray;
    }
    return adminDiscountArray.filter(elem => elem.id.toString().includes(nameDiscount.toLowerCase())
      || elem.postedBy.toLowerCase().includes(nameDiscount.toLowerCase())
      || elem.text.toLowerCase().includes(nameDiscount.toLowerCase())
      || elem.title.toLowerCase().includes(nameDiscount.toLowerCase())
    )
  }
}



