import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID,NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { BasketComponent } from './pages/basket/basket.component';

import { AdminComponent } from './admin/admin.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';

import { SearchPipe } from '../app/shared/pipes/search.pipe';
import { SortPipe } from '../app/shared/pipes/sort.pipe';
import { SearchProductPipe } from '../app/shared/pipes/search-product.pipe';
import { OrderModule } from 'ngx-order-pipe';
import { SearchDiscountPipe } from '../app/shared/pipes/search-discount.pipe';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { SearchOrderPipe } from './shared/pipes/search-order.pipe';

registerLocaleData(localeUk);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BlogComponent,
    AdminBlogComponent,
    AdminComponent,
    BlogDetailsComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    SearchPipe,
    SortPipe,
    SearchProductPipe,
    ProductDetailsComponent,
    HomeComponent,
    ProductComponent,
    SearchDiscountPipe,
    BasketComponent,
    AdminOrderComponent,
    LoginComponent,
    SearchOrderPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    OrderModule,

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'uk' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
