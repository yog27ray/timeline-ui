import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import { ClickStopPropagationModule } from '../../directives/click-stop-propagation/click-stop-propagation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClickStopPropagationModule,
  ],
  declarations: [CreatePostComponent],
  exports: [CreatePostComponent],
})
export class CreatePostModule {}
