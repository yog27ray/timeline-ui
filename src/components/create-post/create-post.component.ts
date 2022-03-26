import { Component, EventEmitter, Output } from '@angular/core';
import { AppConfig } from '../../providers/app-config/app-config';
import { Table } from '../../providers/connection-service/table';
import { BroadcastService } from '../../providers/broadcast-service';

@Component({ selector: 'create-post', templateUrl: './create-post.pug' })
export class CreatePostComponent {
  @Output('close') close: EventEmitter<void> = new EventEmitter<void>();
  categories: Array<{ name: string; value: string }>;
  post: { title?: string, description?: string, category?: string; link?: string; } = {};

  constructor(private appConfig: AppConfig, private broadcastService: BroadcastService) {
    this.categories = appConfig.categories;
  }

  closeDialog(): void {
    this.close.emit();
  }

  async createPost(): Promise<void> {
    const newPost = new Table.Post();
    newPost.set('title', this.post.title);
    newPost.set('description', this.post.description);
    newPost.set('category', this.post.category);
    newPost.set('link', this.post.link);
    await newPost.save();
    this.closeDialog();
    this.broadcastService.broadcast('NEW_POST', { post: newPost });
  }
}
