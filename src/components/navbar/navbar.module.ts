import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { CreatePostModule } from '../create-post/create-post.module';

@NgModule({
  imports: [
    CommonModule,
    CreatePostModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
