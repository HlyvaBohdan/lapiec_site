import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/shared/services/blog.service';
import { IBlog } from "src/shared/interfaces/blog.interface";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  userBlog: Array<IBlog> = [];
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.userJSONBlog()
  }

  private userJSONBlog(): void {
    this.blogService.getJSONBlogs().subscribe(data => {
      this.userBlog = data;
    })
  }
  
}
