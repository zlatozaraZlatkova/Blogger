// google-auth.service.ts - най-простия вариант
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  private tokenClient: any = null;
  private accessToken: string | null = null;

  constructor() {}

  public initializeOAuthClient(clientId: string, scope: string): void {
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
          console.log('Access Token received:', this.accessToken);
        },
      });
      
      console.log('OAuth client initialized successfully');
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
}