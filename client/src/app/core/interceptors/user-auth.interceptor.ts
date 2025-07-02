import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class UserAuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestWithCookies = req.clone({ withCredentials: true });

        if ((req.url.includes('googleapis.com')) ||
            (req.url.includes('accounts.google.com')) ||
            (req.url.includes('oauth2.googleapis.com'))

        ) {
            return next.handle(req);
        }

        return next.handle(requestWithCookies);
    }
}

export const userAuthInterceptor: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: UserAuthInterceptor,
    multi: true

}