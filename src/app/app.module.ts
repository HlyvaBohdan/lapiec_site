import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AdminComponent } from './admin/admin.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchPipe } from '../shared/pipes/search.pipe';
import { SortPipe } from '../shared/pipes/sort.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlogComponent,
    AdminBlogComponent,
    AdminComponent,
    BlogDetailsComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    SearchPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
