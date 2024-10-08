import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:5000/users';
public isGuest=localStorage.getItem("user")?false:true;
  constructor(private http: HttpClient) { }
  login(user:object){
    return this.http.post<User>(`${this.baseUrl}/signin`, user);
  }
  register(user:object){
    return this.http.post<User>(`${this.baseUrl}/signup`, user);
  }
}
