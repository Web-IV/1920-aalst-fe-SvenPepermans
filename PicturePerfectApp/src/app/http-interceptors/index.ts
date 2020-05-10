import { AuthenticationInterceptor } from './authentication-interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationInterceptor,
        multi: true
    }
];