import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private tokenClient: any = null;
  private accessToken: string | null = null;

  constructor() {}

  initializeOAuthClient(clientId: string, scope: string): void {
    const google = (window as any).google;

    if (!google?.accounts?.oauth2) {
      throw new Error('Google Identity Services not loaded!');
    }

    try {
      this.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: scope,
        callback: (tokenResponse: any) => {
          this.accessToken = tokenResponse.access_token;
          //console.log('Access Token received:', this.accessToken);
        },
      });

      //console.log('OAuth client initialized successfully');
    } catch (error) {
      console.error('Error initializing OAuth client:', error);
      throw error;
    }
  }

  requestAccessToken(): void {
    if (!this.tokenClient) {
      throw new Error('Token client is not initialized!');
    }

    this.tokenClient.requestAccessToken();
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  googleSignIn$(): Observable<string> {
    return new Observable<string>((observer) => {
      if(!this.tokenClient) {
        observer.error('Token client is not initialized!');
        return;
      }

      this.tokenClient.callback = (tokenResponse: any) => {
        if(tokenResponse.error !== undefined) {
          observer.error(`Goolge Sign-In Error ${tokenResponse.error}`)
          return;
        }

        const token = tokenResponse.access_token;
        this.accessToken = token;

        observer.next(token);
        observer.complete();
      }

      this.tokenClient.requestAccessToken({ prompt: 'consent' });

    })
  }

}
