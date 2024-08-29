import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers() : Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiUrl+environment.methods.Users);
  }
  deleteUser(id: string) {
    return this.httpClient.delete(`${environment.apiUrl}${environment.methods.Users}/${id}`);
  }
}
