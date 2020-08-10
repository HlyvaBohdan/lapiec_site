import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/products';
  }
  getJSONProduct(): Observable<Array<IProduct>>{
    return this.http.get<Array<IProduct>>(this.url)
  }
  postJSONProduct(product: IProduct): Observable<IProduct>{
    return this.http.post<IProduct>(this.url, product)
  }
  updateJSONProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.url}/${product.id}`, product)
  }
  deleteJSONProduct(index: number): Observable<IProduct>{
    return this.http.delete<IProduct>(`${this.url}/${index}`)
  }
  getCategoryProduct(name:string):Observable<Array<IProduct>>{
    return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=${name}`)
  }
  getOneProduct(id: number): Observable<IProduct>{
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

  productCountService(product: IProduct, status: boolean):number {
    if (status) {
      return product.count++;
    }
    else {
      if (product.count > 1) {
       return product.count--;
      }
    }
  }
  
}
