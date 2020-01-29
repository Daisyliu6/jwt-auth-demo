// RxJS subjects and Observables used to store the current user object 
// and notify other components when the user logs in and out of the app
// login() method sends the user credentials to the API via an HTTP POST request for authentication
// constructor() initialise the currentUserSubject witht he currentUser object from localstorage which enables the user to stay logged in between pages refreshes ot after the brower is closed
// currentUservalue getter allows other components an easy way to get the value of the currently logged in user without having to subscribe to the currentUser Observable
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "@environments/environment";
import { User } from "@app/_models";

@Injectable({ providedIn: "root" })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string){ 
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in betwwen page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
    }

    logout(){
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
}
