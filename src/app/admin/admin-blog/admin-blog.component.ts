import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/shared/services/blog.service';
import { Blog } from "src/shared/models/blog.model";
import { IBlog } from "src/shared/interfaces/blog.interface";


@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  adminBlogArray: Array<IBlog>
  id = 1;
  title: string;
  text: string;
  postedBy: string;
  editStatus: boolean;
  image = 'https://www.pizzaking.ua/uk/resizer/resize/?w=472&h=472&type=c&image=./upload/catalog/2/24c1c648b5bd1bf45f113b185c697f2e';

  constructor(private blogServise: BlogService) { }

  ngOnInit(): void {
    this.adminJSONBlogs();
    this.reset();
  }

  private adminJSONBlogs(): void {
    this.blogServise.getJSONBlogs().subscribe(
      data => {
        this.adminBlogArray = data
      })
  }

  addBlog(): void {
    let date = Date.now();
    const newBlog = new Blog(this.id, this.title, this.text, this.postedBy, date, this.image);
    if (this.title != '' && this.text != '' && this.postedBy != '') {
      if (!this.editStatus) {
        delete newBlog.id;
        this.blogServise.postJSONBlogs(newBlog).subscribe(() => {
          this.adminJSONBlogs();
        })
      }
      else {
        this.blogServise.updateJSONBlog(newBlog).subscribe(() => {
          this.adminJSONBlogs();
        });
        this.editStatus = false;
      }
      console.log(this.title)
    }
    else {
      alert('Please check all fields!')
    }
    this.reset()
  }

  editBlog(blog: IBlog): void {
    this.title = blog.title;
    this.text = blog.text;
    this.postedBy = blog.postedBy;
    this.id = blog.id;
    this.editStatus = true;
  }

  deleteBlog(blog: IBlog): void {
    if (confirm('Are you sure?')) {
      this.blogServise.deleteJSONBlog(blog.id).subscribe(() => {
        this.adminJSONBlogs()
      })
    }
    this.reset();
  }

  reset() {
    this.title = '';
    this.text = '';
    this.postedBy = '';
  }
}
