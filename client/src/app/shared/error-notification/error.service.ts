import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private apiError$$ = new BehaviorSubject<string | null>(null);
  apiError$ = this.apiError$$.asObservable();

  setError(msgError: string): void{
    this.apiError$$.next(msgError);
  }
  
  clearError(): void {
    this.apiError$$.next(null);
  }
 
}
