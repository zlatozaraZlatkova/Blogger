import {
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ErrorService } from 'src/app/shared/error-notification/error.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private errorService: ErrorService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    
                    if (error.status === 401) {
                       return EMPTY //of(new HttpResponse({ status: 401, body: null })) as Observable<HttpEvent<any>>;
                    }

                    let errorMessage = '';
                    if (error.error && error.error.message) {
                        errorMessage = error.error.message;
                    } else {
                        errorMessage = error.message;
                    }

                    this.errorService.setError(errorMessage);

                    return EMPTY; //return throwError(() => new Error(errorMessage));
                    
                })
            );
    }
}

export const errorInterceptor: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
