import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from "src/shared/interfaces/category.interface";
import { Category } from "src/shared/models/category.model";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from 'src/shared/services/category.service';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  adminCategory: Array<ICategory> = [];
  categoryID = 1;
  nameEN = '';
  nameUA = '';
  nameCategory: string;
  currentIndexDelete: number;
  checkInput = false;
  sortNameUA: boolean;
  sortNameEN: boolean;
  sortNumber: boolean;
  sortCount = 0;
  constructor(private modalService: BsModalService, private catService: CategoryService) { }

  ngOnInit(): void {
    this.adminJSONCategories();
  }

  private adminJSONCategories(): void {
    this.catService.getJSONCategory().subscribe(data => {
      this.adminCategory = data
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template: TemplateRef<any>, index: number) {
    this.modalRef = this.modalService.show(template);
    this.currentIndexDelete = index;
  }

  submitModel(): void {
    const newCat = new Category(this.categoryID, this.nameEN, this.nameUA);
    delete newCat.id;
    this.catService.postJSONCategory(newCat).subscribe(
      () => {
        this.adminJSONCategories()
      }
    );
    this.resetModel();
  }

  deleteModel(template: TemplateRef<any>): void {
    if (confirm('Are you sure?')) {
      this.catService.deleteJSONCategory(this.currentIndexDelete).subscribe(
        () => {
          this.adminJSONCategories()
        }
      )
      this.modalService.hide(1);
    }
  }

  checkInputs(): void {
    if (this.nameEN == '' || this.nameUA == '') {
      this.checkInput = false
    }
    else {
      this.checkInput = true
    }
  }

  resetModel(): void {
    this.modalService.hide(1);
    this.nameEN = '';
    this.nameUA = '';
    this.categoryID = 1;
    this.checkInput = false
  }

  sortClickOne(): void {
    this.sortNumber = !this.sortNumber
    this.sortNameUA = false;
    this.sortNameEN = false;
    this.sortCount++;
  }

  sortClickTwo(): void {
    this.sortNameEN = !this.sortNameEN
    this.sortNameUA = false;
    this.sortNumber = false;
    this.sortCount++;
  }

  sortClickThree(): void {
    this.sortNameUA = !this.sortNameUA
    this.sortNameEN = false;
    this.sortNumber = false;
    this.sortCount++;
  }

}
