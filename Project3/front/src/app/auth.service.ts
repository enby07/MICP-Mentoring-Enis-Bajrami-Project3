import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = 'http://localhost:3000';

  

  constructor(private http: HttpClient) {}
  
  // getUserRole(){
  //   return this.http.get(`${this.baseURL}/user/getUser/${userId}`);
  // }
  getRole(userId: number): Observable<{ role: number }> {
    // const url = `${this.baseURL}/user/getUserRole/${userId}`;
    const url = `${this.baseURL}/user/getUserRole`;
    return this.http.get<{ role: number }>(url);
  }

  register(username: string, email: string, password: string) {
    return this.http.post(`${this.baseURL}/user/register`, { username, email, password });
  }

  login(username: string, password: string) {
    const url = `${this.baseURL}/user/getUserRole`;
    const role = this.http.get<{role: number}>(url);
    return this.http.post(`${this.baseURL}/user/login`, { username, password, role });
  } 

  // login(username: string, password: string): Observable<any> {
  //   const roleUrl = `${this.baseURL}/user/getUserRole`;

  //   // Make the GET request to fetch the user role
  //   return this.http.get<{ role: number }>(roleUrl).pipe(
  //     switchMap((roleResponse: { role: any; }) => {
  //       // roleResponse contains the result of the GET request
  //       const role = roleResponse.role;

  //       // Make the POST request with the fetched role
  //       const loginUrl = `${this.baseURL}/user/login`;
  //       return this.http.post(loginUrl, { username, password, role });
  //     })
  //   );
  // }

  logout(){

  }
}