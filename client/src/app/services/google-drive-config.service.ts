import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';

import { IGoogleDriveConfig } from '../interfaces/googleDriveConfig';


@Injectable({
  providedIn: 'root',
})
export class GoogleDriveConfigService {
  private config!: IGoogleDriveConfig;

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
}
