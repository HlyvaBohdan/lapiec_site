import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { IBlog } from "src/app/shared/interfaces/blog.interface";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  userDiscount: Array<IBlog> = [];
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.userJSONDiscount()
  }

  private userJSONDiscount(): void {
    this.blogService.getJSONDiscounts().subscribe(data => {
      this.userDiscount = data;
    })
  }
  
}
