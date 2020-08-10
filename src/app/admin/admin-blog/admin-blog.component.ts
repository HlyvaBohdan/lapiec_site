import { Component, OnInit, TemplateRef } from '@angular/core';
import { BlogService } from 'src/app/shared/services/blog.service';
import { Blog } from "src/app/shared/models/blog.model";
import { IBlog } from "src/app/shared/interfaces/blog.interface";
import { OrderPipe } from 'ngx-order-pipe';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  modalRef: BsModalRef;
  adminDiscountArray: Array<IBlog>
  id = 1;
  title: string;
  text: string;
  postedBy: string;
  editStatus: boolean;
  nameDiscount: string;
  image: string;
  imageStatus: boolean;
  reverse: boolean = false;
  sortedCollection: Array<IBlog>;
  order: string = 'id';
  uploadProgress: Observable<number>;

  constructor(private blogServise: BlogService,
    private modalService: BsModalService,
    private orderPipe: OrderPipe,
    private afStorage: AngularFireStorage,
  ) {
    this.sortedCollection = this.orderPipe.transform(this.adminDiscountArray, 'id');
  }

  ngOnInit(): void {
    this.adminJSONDiscounts();
    this.reset();
  }

  private adminJSONDiscounts(): void {
    this.blogServise.getJSONDiscounts().subscribe(
      data => {
        this.adminDiscountArray = data;
      })
  }
  
  addDiscount(): void {
    let date = Date.now();
    const newBlog = new Blog(this.id, this.title, this.text, this.postedBy, date, this.image);
    if (this.title != '' && this.text != '' && this.postedBy != '') {
      if (!this.editStatus) {
        delete newBlog.id;
        this.blogServise.postJSONDiscounts(newBlog).subscribe(() => {
          this.adminJSONDiscounts();
        })
      }
      else {
        this.blogServise.updateJSONDiscount(newBlog).subscribe(() => {
          this.adminJSONDiscounts();
        });
        this.editStatus = false;
      }
      this.reset()
    }
    else {
      alert('Please check all fields!')
    }
    
  }

  editDiscount(template: TemplateRef<any>, discount: IBlog): void {
    this.modalRef = this.modalService.show(template);
    this.title = discount.title;
    this.text = discount.text;
    this.postedBy = discount.postedBy;
    this.id = discount.id;
    this.image = discount.image;
    this.editStatus = true;
  }

  deleteDiscount(discount: IBlog): void {
    if (confirm('Are you sure?')) {
      this.blogServise.deleteJSONDiscount(discount.id).subscribe(() => {
        this.adminJSONDiscounts()
      })
    }
    this.reset();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase()
    const filePath = `images/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.image = url;
        this.imageStatus = true;
      })
    })
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  
  reset(): void {
    this.modalService.hide(1);
    this.imageStatus = false;
    this.title = '';
    this.text = '';
    this.postedBy = '';
    this.image = '';
    this.id = 1;
  }
}
