import { Component } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { ConnectionService } from '../../providers/connection-service';
import { BroadcastService } from '../../providers/broadcast-service';

@Component({ selector: 'navbar', templateUrl: './navbar.pug' })
export class NavbarComponent {
  ui: { modal: { createPost: boolean } } = { modal: { createPost: false } };

  constructor(
    private socialAuthService: SocialAuthService,
    private connectionService: ConnectionService,
    private broadcastService: BroadcastService,
    private router: Router) {}

  async logout(): Promise<void> {
    await this.connectionService.logout();
    await this.socialAuthService.signOut(true).catch(() => 0);
    await this.router.navigate(['/login']);
  }

  openCreatePost(): void {
    this.ui.modal.createPost = true;
  }
}
