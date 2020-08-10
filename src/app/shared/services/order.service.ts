import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  basket: Subject<any>= new Subject();;
  constructor() { }

  addBasketService(product: IProduct){
    let localProducts: Array<IProduct> = [];
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'));
      if (localProducts.some(prod => prod.id === product.id)){
        const index = localProducts.findIndex(prod => prod.id === product.id);
       localProducts[index].count += product.count;
      }
      else {
        localProducts.push(product);
      }
    }
    else {
      localProducts.push(product);
    }
    localStorage.setItem('myOrder', JSON.stringify(localProducts));
    this.basket.next('qqqq');
    product.count = 1;
  }
}
