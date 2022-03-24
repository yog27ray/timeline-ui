import { Injectable } from '@angular/core';
import { MongoToParseQuery, RequestQueryPayload } from 'mongo-to-parse';
import { Config } from '../../environments/config';
import { BroadcastService } from '../broadcast-service';
import { Table } from './table';

@Injectable()
export class ConnectionService extends MongoToParseQuery {
  window: any;

  constructor(private broadcastService: BroadcastService) {
    super();
    super.initialize(Config.PARSE_APP_ID, Config.PARSE_SERVER_URL);
  }

  async verifyGoogleLogin(authData: { id: string; id_token: string }): Promise<void> {
    const { sessionToken } = await this.Cloud.run('login', { method: 'google', authData }) as { sessionToken: string };
    await this.loginWithToken(sessionToken);
  }

  get isUserLoggedIn(): boolean {
    return !!(this.getCurrentUser() && this.getCurrentUser().get('sessionToken'));
  }

  getCurrentUser(): any {
    return this.parse.User.current();
  }

  private async loginWithToken(sessionToken: string): Promise<void> {
    await this.parse.User.become(sessionToken);
    this.broadcastService.broadcast('USER_LOGGED_IN');
  }

  async logout(): Promise<void> {
    await this.parse.User.logOut().catch(() => 0);
    this.broadcastService.broadcast('USER_LOGGED_OUT');
  }

  findPosts(payload: RequestQueryPayload<typeof Table.Post>): Promise<typeof Table.Post> {
    return this.find(Table.Post, payload);
  }
}
