import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BroadcastService } from '../../providers/broadcast-service';
import { ConnectionService } from '../../providers/connection-service';
import { AppConfig } from '../../providers/app-config/app-config';

@Component({ selector: 'timeline', templateUrl: './timeline.pug' })
export class TimelineComponent implements OnInit, OnDestroy {
  beforeScrollEnd = () => this.loadMore();
  subscriptions: Array<Subscription> = [];

  ui: { loading: boolean } = { loading: false };
  data: {
    pageSize: number;
    items: Array<{
      category: string;
      title: string;
      description: string;
      eventTime: { iso: string };
      user: { photo: string; name: string; };
    }>;
    fetchMore: boolean;
  } = { pageSize: 10, items: [], fetchMore: true };

  constructor(
    private broadcastService: BroadcastService,
    private connectionService: ConnectionService,
    public appConfig: AppConfig) {
    this.subscriptions.push(this.broadcastService.on<{ post: any }>('NEW_POST').subscribe(({ post }) => {
      this.data.items.unshift(post.toJSON());
    }));
  }

  ngOnDestroy(): void {
    while (this.subscriptions.length) {
      this.subscriptions.pop()?.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadMore();
  }

  async loadMore(): Promise<void> {
    if (!this.data.fetchMore || this.ui.loading) {
      return;
    }
    this.ui.loading = true;
    const posts = (await this.connectionService.findPosts({
      where: {},
      limit: this.data.pageSize,
      skip: this.data.items.length,
      descending: 'eventTime',
      include: ['user'],
    })).map((each: any) => each.toJSON());
    this.data.items.push(...posts);
    this.data.fetchMore = !!posts.length;
    this.ui.loading = false;
  }
}
