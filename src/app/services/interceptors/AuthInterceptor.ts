import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const token = sessionStorage.getItem('token'); 

  const authReq = token 
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) 
    : req;
  return next(authReq);

}