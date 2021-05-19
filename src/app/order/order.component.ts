import { DoctorTicketDto } from './../user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../register/account.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  private apiServerUrl = environment.apiBaseUrl;
  isAuthenticated: boolean;
  specs: { id: number, name: string }[];
  freeTickets: DoctorTicketDto[];
  closeResult: string; //for confirmationModal
  isConfirmed: boolean = false;

  constructor(private modalService: NgbModal, private http: HttpClient, public accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.isAuthenticated = sessionStorage.getItem('token') ? true : false;
    this.getAllSpecs();
    console.log(this.freeTickets);
  }

  getAllSpecs() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + sessionStorage.getItem('token')
    });
    this.http.get<any>(`${this.apiServerUrl}/order/all`, { headers: headers }).subscribe(
      (response: any) => {
        this.specs = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    console.log(this.freeTickets);

  }

  getTickets(id: number) {
    this.isConfirmed = false;
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + sessionStorage.getItem('token')
    });
    this.http.get<any>(`${this.apiServerUrl}/order/` + id, { headers: headers }).subscribe(
      (response: any) => {
        this.freeTickets = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    console.log(this.freeTickets);

  }

  confirmTicket(id: number) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + sessionStorage.getItem('token')
    });
    this.http.put<any>(`${this.apiServerUrl}/order/confirm/` + id, {}, { headers: headers }).subscribe(
      (response: any) => {
        this.isConfirmed = true;
        this.freeTickets = [];
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  goToPersonalAccount() {
    this.router.navigateByUrl('/account');
  }

  openModal(content: any, ticketId: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.confirmTicket(ticketId);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}









