import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../providers/connection-service';
import { BroadcastService } from '../providers/broadcast-service';

@Component({ selector: 'app-root', templateUrl: './app.pug' })
export class AppComponent implements OnInit {
  showNavBar: boolean = true;

  constructor(
    private connectionService: ConnectionService,
    private broadcastService: BroadcastService,
    private router: Router) {}

  ngOnInit(): void {
    this.updateUserStatus();
    this.addListeners();
    if (this.connectionService.isUserLoggedIn) {
      this.updateUser()
        .catch((error) => {
          if (error.code === 209) {
            this.connectionService.logout();
            this.router.navigate(['/login']);
          }
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

  private updateUserStatus() {
    this.showNavBar = this.connectionService.isUserLoggedIn;
  }

  private addListeners() {
    this.broadcastService.on<{}>('USER_LOGGED_IN').subscribe((): void => this.updateUserStatus());
    this.broadcastService.on<{}>('USER_LOGGED_OUT').subscribe((): void => this.updateUserStatus());
  }

  private updateUser(): Promise<void> {
    return this.connectionService.getCurrentUser().fetch();
  }
}
