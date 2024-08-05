
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {
  }

  URL: string="http://localhost:5100/";

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
        
        // httpRequest.clone({ url: `${this.URL}${httpRequest.url}` });
        var apiReq = httpRequest.clone({ url: `${this.URL}${httpRequest.url}` });

        const token = localStorage.getItem("authtoken");
        if (token!="" && token!=null && token!=undefined) {
            apiReq = apiReq.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return next.handle(apiReq);
    }
    catch (error) {
      return next.handle(httpRequest.clone());
    }
  }
}
