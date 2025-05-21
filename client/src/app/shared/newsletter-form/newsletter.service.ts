import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { INewsletterResponse } from "src/app/interfaces/newsletter";

@Injectable({
  providedIn: 'root',
})

export class NewsletterService {
  private basicUrl = '/api/newsletter';

  constructor(private httpClient: HttpClient) {}

  subscribeToNewsletter(email: string): Observable<INewsletterResponse> {
    return this.httpClient.post<INewsletterResponse>(`${this.basicUrl}/signup`, { email });
  }

  unsubscribeToNewsletter(email: string): Observable<INewsletterResponse> {
    return this.httpClient.post<INewsletterResponse>(`${this.basicUrl}/unsubscribe`, { email });
  }
}