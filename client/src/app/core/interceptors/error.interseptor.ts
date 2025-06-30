import {
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    
                    if (error.status === 401) {
                       return of(new HttpResponse({ status: 401, body: null })) as Observable<HttpEvent<any>>;
                    }

                    let errorMessage = '';
                    if (error.error && error.error.message) {
                        errorMessage = error.error.message;
                    } else {
                        errorMessage = error.message;
                    }
                    return throwError(() => new Error(errorMessage));
                })
            );
    }
}

export const errorInterceptor: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
