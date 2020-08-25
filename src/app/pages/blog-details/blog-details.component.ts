import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { IBlog } from "src/app/shared/interfaces/blog.interface";
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  discount: IBlog;
  constructor(private blogService: BlogService, private router: ActivatedRoute, private Location: Location, private afStore:AngularFirestore) { }

  ngOnInit(): void {
    this.getMyDiscount()
  }

  // getMyDiscount(): void {
  //   const id = +this.router.snapshot.paramMap.get('id');
  //   this.blogService.getOneJSONDiscount(id).subscribe(data => {
  //     this.discount = data;
  //   })
  // }

  getMyDiscount(): void {
    const title = this.router.snapshot.paramMap.get('title');
    this.afStore.collection('discounts').ref.where('title', '==', title).onSnapshot(
      collection=>{
        collection.forEach(info => {
          const data=info.data() as IBlog
          const id = info.id;
          this.discount={id,...data}
        })
      }
    )
  }

  goBack(): void {
    this.Location.back()
  }

}
