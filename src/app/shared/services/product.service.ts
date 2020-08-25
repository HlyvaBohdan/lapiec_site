import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string;

  constructor(private http: HttpClient, private firestore:AngularFirestore) { 
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

  getFirecloudProduct(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('products').snapshotChanges()
  }

  postFirecloudProduct(product:IProduct):Promise<DocumentReference>{
    return this.firestore.collection('products').add(product);
  }

  deleteFirecloudProduct(id:number): Promise<void> {
    return this.firestore.collection('products').doc(id.toString()).delete();
  }

  updateFirecloudProduct(product: IProduct): Promise<void> {
    return this.firestore.collection('products').doc(product.id.toString()).update(product);
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
