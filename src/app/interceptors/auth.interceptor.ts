import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthResponse } from '../models/AuthResponse';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const authSrv = inject(AuthService);
  let token: any;
  // if(authSrv.isTokenExpired()) {
  //   if(authSrv.token)
  //     authSrv.autoRefreshToken(authSrv.token as AuthResponse).subscribe(
  //       {
  //         next: (res: AuthResponse) => {
  //           token = res;
  //         },
  //         error: (err)=> {
  //           console.error(err);
  //           router.navigateByUrl('/login');
  //         }
  //       }
  //   );
  // } else {
    token = authSrv.token;
  // }
  let modifiedReq = req;
  if(token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token?.accessToken}`
    }});

  }
  return next(modifiedReq).pipe(
    catchError((err: any) => {
      if(err instanceof HttpErrorResponse) {
        if(err.status === 401) {
          let authResponse = authSrv.token;
          if(authResponse)
          return authSrv.autoRefreshToken(authResponse).pipe(
              switchMap((data: AuthResponse) => {
                modifiedReq = modifiedReq.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token?.accessToken}`
                }});
                return next(modifiedReq);
              }),
              catchError((err) => {
                return throwError(()=> {
                  router.navigate(['login']);
                })
              })
            )
        }
      }
      return throwError(()=> err)
    })
  );
};
