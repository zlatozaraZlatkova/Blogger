import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class GoogleDriveApiService {
  constructor(private httpClient: HttpClient) { }

  uploadDriveImage(formDataDrive: FormData, accessToken: string | null): Observable<any> {
    const uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`, 
    });

    return this.httpClient.post(uploadUrl, formDataDrive, { headers });
  }

  makeFilePublic(fileId: string, accessToken: string | null): Observable<any> {
    const shareUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });

    const body = {
      role: 'reader',
      type: 'anyone'
    };

    return this.httpClient.post(shareUrl, body, { headers });
  }
}
