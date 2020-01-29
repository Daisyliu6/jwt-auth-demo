// method for getting all users from the api 
// access a secure api endpoint with the http authorization header set after loggin in to the app

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' }) 
export class UserService {
    constructor(private http: HttpClient) {}

    getAll(){
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
}