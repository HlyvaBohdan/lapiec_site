import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() categoryHome: string;

  userProduct: Array<IProduct> = [];
  
  category: string;
  constructor(private prodService: ProductService,
    private orderService: OrderService,
    private actRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.actRoute.snapshot.paramMap.get('category')
        this.userProducts(categoryName)
      }
    })
  }
  ngOnInit(): void {
    if (this.categoryHome == 'pizza') {
      this.userProducts(this.categoryHome)
      console.log(this.categoryHome)
    }
  }

  private userProducts(categoryName: string): void {
    this.prodService.getCategoryProduct(categoryName).subscribe(data => {
      this.userProduct = data;
      this.category = this.userProduct[0]?.category.nameUA;
    })
  }

  productCount(product: IProduct, status: boolean): void {
   this.prodService.productCountService(product, status)
  }

  addBasket(product: IProduct): void {
    this.orderService.addBasketService(product)
  }
  
}

