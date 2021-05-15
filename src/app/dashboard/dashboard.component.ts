import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

import { NgForm } from '@angular/forms';
import { AccountService } from '../register/account.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  user: User = new User();
  isAuthenticated: boolean = false;
  isRegisterPressed: boolean = false;

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.isAuthenticated = true;
    }
  }

  login() {
    this.accountService.login(this.user).subscribe(
      (response: boolean) => {
        if (response) {
          sessionStorage.setItem(
            'token',
            btoa(this.user.username + ':' + this.user.password)
          );
          this.isAuthenticated = true;
          document.getElementById('login-user-form')!.click();
          this.router.navigateByUrl('/');
        } else {
          alert("Authentication failed.");
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  register(regForm: NgForm) {
    this.isRegisterPressed = true;
    this.accountService.register(regForm).subscribe(
      (response: string) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onOpenModal(mode: string): void {
    const container = document.getElementById('nav-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'login') {
      button.setAttribute('data-target', '#loginModal');
    }
    if (mode === 'register') {
      button.setAttribute('data-target', '#registerModal');
    }
    container.appendChild(button);
    button.click();
  }

  goToPersonalAccount() {
    this.router.navigateByUrl('/account');
  }
}
