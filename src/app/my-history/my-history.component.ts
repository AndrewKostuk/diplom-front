import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../register/account.service';
import { VisitDto } from '../user';

@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.css']
})
export class MyHistoryComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl;
  isAuthenticated: boolean;
  visits: VisitDto[];
  procedureNames: string[];
  procedureAmouns: number[];

  constructor(private http: HttpClient, public accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUserHistory();
    this.isAuthenticated = sessionStorage.getItem('token') ? true : false;
  }

  getUserHistory() {
      const headers: HttpHeaders = new HttpHeaders({
        Authorization: 'Basic ' + sessionStorage.getItem('token')
      });
      this.http.get<any>(`${this.apiServerUrl}/profile/myHistory`, { headers: headers }).subscribe(
        (response: any) => {
          this.visits = response; 
          console.log(response);
        },
        (error: HttpErrorResponse) => {
          alert(error.error);
        }
      );
  }

  goToPersonalAccount() {
    this.router.navigateByUrl('/account');
  }
}
