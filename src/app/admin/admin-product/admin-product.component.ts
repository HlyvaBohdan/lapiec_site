import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Product } from 'src/app/shared/models/product.model';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  modalRef: BsModalRef;
  nameProduct: string;
  categories: Array<ICategory> = [];
  adminProduct: Array<IProduct>;
  productID = 1;
  productCategory: ICategory = { id: 1, nameEN: 'pizza', nameUA: 'піца' };
  productNameEN = '';
  productNameUA = '';
  productDescription = '';
  productWeight = '';
  productPrice: number;
  productImage = '';
  categoryName: string;
  uploadProgress: Observable<number>;
  imageStatus: boolean;
  currentIndexDelete: number;
  checkInput: boolean = false;
  reverse: boolean = false;
  order: string = 'nameEn';
  sortedCollection: Array<IProduct>;
  editStatus: boolean;
  constructor(private catService: CategoryService,
    private modalService: BsModalService,
    private prodService: ProductService,
    private afStorage: AngularFireStorage,
    private orderPipe: OrderPipe,) {
    this.sortedCollection = this.orderPipe.transform(this.adminProduct, 'nameEn');
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  private getCategories(): void {
    this.catService.getJSONCategory().subscribe(data => {
      this.categories = data
    })

  }

  private getProducts(): void {
    this.prodService.getJSONProduct().subscribe(data => {
      this.adminProduct = data;
    });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  openModal1(template: TemplateRef<any>, product: IProduct) {
    this.modalRef = this.modalService.show(template);
    this.productID = product.id;
    this.productCategory = product.category;
    this.productNameEN = product.nameEN;
    this.productNameUA = product.nameUA;
    this.productDescription = product.description;
    this.productWeight = product.weight;
    this.productPrice = product.price;
    this.productImage = product.image
    this.editStatus = true;
    this.categoryName = this.productCategory.nameUA
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.categoryName = this.categories[0].nameUA
  }

  addProduct(): void {
    this.checkInputs()
    const product: IProduct = new Product(this.productID,
      this.productCategory,
      this.productNameEN,
      this.productNameUA,
      this.productDescription,
      this.productWeight,
      this.productPrice,
      this.productImage);
    if (this.checkInput == true) {
      if (!this.editStatus) {
        delete product.id;
        this.prodService.postJSONProduct(product).subscribe(() => {
          this.getProducts();
        })
      }
      else {
        this.prodService.updateJSONProduct(product).subscribe(() => {
          this.getProducts();
        });
        this.editStatus = false
      }
      this.resetModel()
    }
  }

  setCategory(): void {
    this.productCategory = this.categories.filter(cat => cat.nameUA === this.categoryName)[0];
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
        this.productImage = url;
        this.imageStatus = true;
      })
    })
  }

  openModal2(template: TemplateRef<any>, index: number) {
    this.modalRef = this.modalService.show(template);
    this.currentIndexDelete = index;
  }

  deleteProduct(template: TemplateRef<any>): void {
    if (confirm('Are you sure?')) {
      this.prodService.deleteJSONProduct(this.currentIndexDelete).subscribe(
        () => {
          this.getProducts()
        }
      )
      this.modalService.hide(1);
    }
  }

  checkInputs(): void {
    if (this.productNameEN == '' || this.productNameUA == ''
      || this.productDescription == '' || this.productWeight == '' ||
      this.productPrice == undefined) {
      if (this.editStatus == false && this.productImage != '') {
        this.checkInput = false
      }
      this.checkInput = false
      alert("Please check all inputs!")
    }
    else {
      this.checkInput = true
    }
  }

  resetModel(): void {
    this.modalService.hide(1);
    this.productCategory = { id: 1, nameEN: 'pizza', nameUA: 'піца' };
    this.productNameEN = '';
    this.productNameUA = '';
    this.productDescription = '';
    this.productWeight = '';
    this.productPrice = undefined;
    this.productImage = '';
    this.productID = 1;
    this.checkInput = false;
    this.imageStatus = false;
    this.editStatus = false;
  }

}
