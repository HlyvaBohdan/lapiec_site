import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string;
  constructor(private http: HttpClient,private firestore:AngularFirestore) {
    this.url = 'http://localhost:3000/categories';
  }
  getJSONCategory(): Observable<Array<ICategory>>{
    return this.http.get<Array<ICategory>>(this.url)
  }
  postJSONCategory(category: ICategory): Observable<ICategory>{
    return this.http.post<ICategory>(this.url, category)
  }

  deleteJSONCategory(index:number): Observable<ICategory>{
    return this.http.delete<ICategory>(`${this.url}/${index}`)
  }
  
  getFirecloudCategory(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('categories').snapshotChanges()
  }

  postFirecloudCategory(category:ICategory):Promise<DocumentReference>{
    return this.firestore.collection('categories').add(category);
  }
  
  deleteFirecloudCategory(index:any): Promise<void>{
    return this.firestore.collection('categories').doc(index).delete();

  }

}
