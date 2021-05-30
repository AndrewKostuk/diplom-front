import { Router } from '@angular/router';
import { AccountService } from './../register/account.service';
import { DoctorTicketDto, ServiceTicketDto, User, UserDto } from './../user';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})
export class PersonalAccountComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl;
  userDto: UserDto = new UserDto();
  isAuthenticated: boolean;

  

  constructor(private http: HttpClient, public accountService: AccountService, private router: Router) {

  }

  ngOnInit(): void {
    this.getUserProfile();
    this.isAuthenticated = sessionStorage.getItem('token') ? true : false;
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

  plannedVisits(){
    this.router.navigateByUrl('account/plannedVisits');
  }

  userHistory(){
    this.router.navigateByUrl('account/myHistory');
  }

  getUserProfile() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + sessionStorage.getItem('token')
    });
    this.http.get<UserDto>(`${this.apiServerUrl}/profile`, { headers: headers }).subscribe(
      (response: UserDto) => {
        this.userDto = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

  photoUrl = '';
  onSelectFile(event: Event) {
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files![0]) {
      var reader = new FileReader();

      reader.readAsDataURL((event.target as HTMLInputElement).files![0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.photoUrl = event.target!.result as string;
      }
    }
  }

  public delete() {
    this.photoUrl = '';
  }

  edit(user:UserDto) {
    const headers: HttpHeaders = new HttpHeaders({
      //'Content-Type': 'application/json',
      Authorization: 'Basic ' + sessionStorage.getItem('token')
    });
    this.http.put<UserDto>(`${this.apiServerUrl}/profile/edit`, user, { headers: headers }).subscribe(
      (response: UserDto) => {
        this.userDto = response;
        console.log(response);
        alert('Данные сохранены');
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    );
  }

}
