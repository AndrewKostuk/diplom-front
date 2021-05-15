import { User, UserDto } from './../user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiServerUrl}/login`, user);
  }

  register(regForm: NgForm): Observable<string> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<string>(`${this.apiServerUrl}/registration`, JSON.stringify(regForm.value), { headers: headers, responseType: 'text' as 'json' });
  }

}
