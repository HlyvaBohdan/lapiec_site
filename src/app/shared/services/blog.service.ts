import { Injectable } from '@angular/core';
import { IBlog } from '../interfaces/blog.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private arrBlog: Array<IBlog>;
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/blog'
  }

  getJSONDiscounts(): Observable<Array<IBlog>> {
    return this.http.get<Array<IBlog>>(this.url)
  }

  postJSONDiscounts(discount: IBlog): Observable<IBlog> {
    return this.http.post<IBlog>(this.url, discount)
  }

  updateJSONDiscount(discount: IBlog): Observable<IBlog> {
    return this.http.put<IBlog>(`${this.url}/${discount.id}`, discount)
  }

  deleteJSONDiscount(id: number): Observable<IBlog> {
    return this.http.delete<IBlog>(`${this.url}/${id}`)
  }

  getOneJSONDiscount(id: number): Observable<IBlog> {
    return this.http.get<IBlog>(`${this.url}/${id}`)
  }

}
