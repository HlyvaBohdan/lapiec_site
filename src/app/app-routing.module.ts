import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { AdminComponent } from './admin/admin.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu/:category', component: ProductComponent },
  { path: 'menu/:category/:id', component: ProductDetailsComponent },
  { path: 'discount', component: BlogComponent },  
  { path: 'discount/:id', component: BlogDetailsComponent },
  { path: 'basket', component: BasketComponent },  
  { path: 'login', component: LoginComponent },  

  {
    path: 'admin', component: AdminComponent,canActivate:[AuthGuard], children: [
      { path: '', redirectTo: 'category', pathMatch: 'full' },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product', component: AdminProductComponent },
      { path: 'discount', component: AdminBlogComponent },
      { path: 'order', component: AdminOrderComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
