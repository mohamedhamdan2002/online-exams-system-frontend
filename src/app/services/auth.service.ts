import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginModel } from '../models/LoginModel';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { AuthResponse} from '../models/AuthResponse';
import { UserModel } from '../models/UserModel';
import { SignUpModel } from '../models/SignUpModel';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // logInUser: Subject<User> = new Subject<User>();
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user!: UserModel | null;

  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.token);
    // this.user = this.getUser(this.token);
  }

  login(userForAuth: LoginModel) : Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiUrl+environment.methods.Login, userForAuth).pipe(tap((res => {
      this.handleUserToken(res);
    })));
  }
  signUp(userForRegister: SignUpModel) : Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiUrl+environment.methods.Register, userForRegister).pipe(tap((res => {
      this.handleUserToken(res);
    })));
  }
  private handleUserToken(authResponse: AuthResponse) {
    this._isLoggedIn$.next(true);
    localStorage.setItem('token', JSON.stringify(authResponse));
    this.user = this.getUser(authResponse.accessToken);
  }

  get token() : AuthResponse | null {
    let _token = localStorage.getItem('token');
    if(_token)
      return JSON.parse(_token)
    return null;
  }

  private getUser(token: string | null) : UserModel | null {
    if(!token) {
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const user = {
      id: payload.uid,
      roles: payload.roles,
    } as UserModel;
    return user;
  }
  autoRefreshToken(authResponse: AuthResponse) : Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}${environment.methods.RefreshToken}`, authResponse).pipe(tap((res: AuthResponse) => {
      this.handleUserToken(res);
    }));
  }
  logout() {
    localStorage.removeItem("token");
    this._isLoggedIn$.next(false);
  }
  isTokenExpired() {
    const token = this.token;
    if(!token) return true;
    const decoded = jwtDecode(token.accessToken);
    if(!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();
    return expirationDate < now;
  }
}
