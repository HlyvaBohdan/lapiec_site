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

  getJSONBlogs(): Observable<Array<IBlog>> {
    return this.http.get<Array<IBlog>>(this.url)
  }

  postJSONBlogs(blog: IBlog): Observable<IBlog> {
    return this.http.post<IBlog>(this.url, blog)
  }

  updateJSONBlog(blog: IBlog): Observable<IBlog> {
    return this.http.put<IBlog>(`${this.url}/${blog.id}`, blog)
  }

  deleteJSONBlog(id: number): Observable<IBlog> {
    return this.http.delete<IBlog>(`${this.url}/${id}`)
  }

  getOneJSONBlog(id: number): Observable<IBlog> {
    return this.http.get<IBlog>(`${this.url}/${id}`)
  }
  
}
