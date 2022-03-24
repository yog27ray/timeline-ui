import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login/entities/social-user';
import { Router } from '@angular/router';
import { ConnectionService } from '../../providers/connection-service';

@Component({ selector: 'login', templateUrl: './login.pug' })
export class LoginComponent implements OnInit {
  constructor(
    private authService: SocialAuthService,
    private connectionService: ConnectionService,
    private router: Router) {}

  ngOnInit(): void {
    if (this.connectionService.isUserLoggedIn) {
      this.router.navigate(['/']);
    }
    this.authService.authState.subscribe(async (user: SocialUser) => {
      if (!user) {
        return;
      }
      await this.connectionService.verifyGoogleLogin({ id: user.id, id_token: user.idToken });
      await this.router.navigate(['/']);
    });
  }

  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
