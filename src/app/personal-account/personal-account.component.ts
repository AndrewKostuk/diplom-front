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

  analyses: ServiceTicketDto[];
  procedures: ServiceTicketDto[];
  tickets: DoctorTicketDto[];
  home: DoctorTicketDto[];

  constructor(private http: HttpClient, public accountService: AccountService, private router: Router) {

  }

  ngOnInit(): void {
    this.getUserProfile();
    this.isAuthenticated = sessionStorage.getItem('token') ? true : false;
    this.getPlannedVisits();
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('');
  }

  getPlannedVisits() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + sessionStorage.getItem('token')
    });
    this.http.get<any>(`${this.apiServerUrl}/profile/plannedVisits`, { headers: headers }).subscribe(
      (response: any) => {
        this.analyses = response['analyses'];
        this.procedures = response['procedure'];
        this.tickets = response['tickets'];
        this.home = response['home'];
        console.log(this.analyses);
        console.log(this.procedures);
        console.log(this.tickets);
        console.log(this.home);
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
        alert(error.message);
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

  edit() {
    const headers: HttpHeaders = new HttpHeaders({
      //'Content-Type': 'application/json',
      Authorization: 'Basic ' + sessionStorage.getItem('token')
    });
    this.http.put<UserDto>(`${this.apiServerUrl}/profile/edit`, this.userDto, { headers: headers }).subscribe(
      (response: UserDto) => {
        this.userDto = response;
        console.log(response);
        alert('Данные сохранены');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
