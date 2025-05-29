import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';

import { IGoogleDriveConfig } from '../interfaces/googleDriveConfig';
import { genElements } from '../shared/utils/genDomElement';


@Injectable({
  providedIn: 'root',
})
export class GoogleDriveConfigService {
  private config!: IGoogleDriveConfig;
  private gapiScript: any = null;

  constructor(private httpClient: HttpClient) { }

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

  loadGoogleApiScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const isGapiLoadedAndReady = (window as any).gapi;
      const isScriptTagAlreadyInDom = document.getElementById('google-api-script');

      if (isGapiLoadedAndReady) {
        this.gapiScript = (window as any).gapi;
        resolve();
        return;
      }

      if (isScriptTagAlreadyInDom) {
        isScriptTagAlreadyInDom.addEventListener('load', () => {
          this.gapiScript = (window as any).gapi;
          resolve();
        });

        isScriptTagAlreadyInDom.addEventListener('error', () => {
          reject(new Error('Existing Google API script failed to load'));
        });

        return;
      }

      const newScriptElement = genElements('script', document.head, {
        id: 'google-api-script',
        src: 'https://apis.google.com/js/api.js',
      }) as HTMLScriptElement;

      newScriptElement.addEventListener('load', () => {
        this.gapiScript = (window as any).gapi;
        resolve();
      });

      newScriptElement.addEventListener('error', () => {
        reject(new Error('Google API does not load correctly'));
      });

    });
  }

  getGoogleApiScript() {
    if (!this.gapiScript) {
      throw new Error('Google API is not ready.');
    }
    return this.gapiScript;
  }


}
