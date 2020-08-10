import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string;
  constructor(private http: HttpClient) {
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
}
