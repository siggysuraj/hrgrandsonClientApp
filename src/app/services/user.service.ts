import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, map,catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject : BehaviorSubject<User>;
  private user: Observable<User>;
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl; 
    this.myApiUrl = '/users';
  }  
    ///api/path1/user/
 /* getUsers(): Observable<any[]> {
   return this.http.get<any[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      ); 
     // return this.http.get<User[]>(this.myAppUrl + this.myApiUrl); 
 
  } */

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:8080/users');
  }


  getUser(postId: number): Observable<User> {
    return this.http.get<User>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveUser(user): Observable<any> {
  return this.http.post<User>(this.myAppUrl + this.myApiUrl, JSON.stringify(user),this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );         
     // return this.http.post<any>(this.myAppUrl + this.myApiUrl, user);  
  }


 /* login(email, password) {
    return this.http.post<any>(this.myAppUrl + this.myApiUrl + `authenticate`, {email,password})
    .pipe(map(user => {
     //localStorage.setItem('user', JSON.stringify(user));
     //this.userSubject.next(user);
    return  user;
    
    }));
   
  } */


  updateUser(userId: number, user): Observable<User> {
    return this.http.put<User>(this.myAppUrl + this.myApiUrl + userId, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteUser(postId: number): Observable<User> {
    return this.http.delete<User>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
