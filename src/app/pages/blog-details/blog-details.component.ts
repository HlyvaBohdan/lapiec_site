import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/shared/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { IBlog } from "src/shared/interfaces/blog.interface";
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blog: IBlog;
  constructor(private blogService: BlogService, private router: ActivatedRoute, private Location: Location) { }

  ngOnInit(): void {
    this.getMyBlog()
  }

  getMyBlog(): void {
    const id = +this.router.snapshot.paramMap.get('id');
    this.blogService.getOneJSONBlog(id).subscribe(data => {
      this.blog = data;
      console.log(this.blog)
    })
  }

  goBack(): void {
    this.Location.back()
  }

}
