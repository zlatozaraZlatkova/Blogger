import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';

import { IGoogleDriveConfig } from '../interfaces/googleDriveConfig';
import { genElements } from '../shared/utils/genDomElement';

@Injectable({
  providedIn: 'root',
})
export class GoogleDriveConfigService implements OnDestroy {
  private config!: IGoogleDriveConfig;
  private timer: number | null = null;

  constructor(private httpClient: HttpClient) {}

  loadConfig(): Observable<IGoogleDriveConfig> {
    return this.httpClient
      .get<IGoogleDriveConfig>('/api/config')
      .pipe(tap((cfg) => (this.config = cfg)));
  }

  getConfig(): IGoogleDriveConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded!');
    }
    return this.config;
  }

  loadGoogleIdentityScript(): Observable<void> {
    return new Observable<void>((observer) => {
      const google = (window as any).google;
      const existingScript = document.getElementById(
        'google-identity-script'
      ) as HTMLScriptElement;

      if (google?.accounts) {
        observer.next();
        observer.complete();
        return;
      }

      if (existingScript) {
        existingScript.addEventListener('load', () => {
          observer.next();
          observer.complete();
        });

        existingScript.addEventListener('error', (error) => {
          observer.error(
            new Error('Failed to load GIS script from existing tag')
          );
        });

        return;
      }

      const script = genElements('script', document.head, {
        id: 'google-identity-script',
        src: 'https://accounts.google.com/gsi/client',
        async: true,
        defer: true,
      }) as HTMLScriptElement;

      script.addEventListener('load', () => {
        this.timer = window.setTimeout(() => {
          const google = (window as any).google;
          if (google?.accounts) {
            observer.next();
            observer.complete();
          } else {
            observer.error(new Error('Google Identity Services not available'));
          }
        }, 100);
      });

      script.addEventListener('error', (error) => {
        observer.error(new Error('Failed to load GIS script'));
      });
    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      console.log('Timer cleared');
    }
  }
}
