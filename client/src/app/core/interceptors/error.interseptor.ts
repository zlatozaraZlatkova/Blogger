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
import { catchError, EMPTY, Observable, of, throwError } from 'rxjs';
import { ErrorService } from 'src/app/shared/error-notification/error.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private errorService: ErrorService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {

                    if (error.status === 401 && req.url.includes('/check-auth')) {
                        return of(new HttpResponse({ status: 401, body: null })) as Observable<HttpEvent<any>>;
                    }

                    let errorMessage = this.extractServerMsg(error);
                    this.errorService.setError(errorMessage);

                    return throwError(() => new Error(errorMessage));
                   
                 
                })
            );
    }

    private extractServerMsg(error: HttpErrorResponse): string {

        if (error.error && error.error.message) {
            return error.error.message;
        } else {
            return error.message;
        }
    }

}

export const errorInterceptor: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
