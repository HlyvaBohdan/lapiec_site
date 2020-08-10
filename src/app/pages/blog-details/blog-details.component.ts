import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { IBlog } from "src/app/shared/interfaces/blog.interface";
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  discount: IBlog;
  constructor(private blogService: BlogService, private router: ActivatedRoute, private Location: Location) { }

  ngOnInit(): void {
    this.getMyDiscount()
  }

  getMyDiscount(): void {
    const id = +this.router.snapshot.paramMap.get('id');
    this.blogService.getOneJSONDiscount(id).subscribe(data => {
      this.discount = data;
    })
  }

  goBack(): void {
    this.Location.back()
  }

}
