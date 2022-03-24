import { Provider } from '@angular/core';
import { GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { Config } from '../../environments/config';

const SocialAuthServiceProvider: Provider = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [{ id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider(Config.GoogleClientId) }],
  } as SocialAuthServiceConfig,
};

export { SocialAuthServiceProvider };
