import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AccountService } from '../register/account.service';
import { DoctorTicketDto, ServiceTicketDto } from '../user';

@Component({
  selector: 'app-planned-visits',
  templateUrl: './planned-visits.component.html',
  styleUrls: ['./planned-visits.component.css']
})
export class PlannedVisitsComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl;
  analyses: ServiceTicketDto[];
  procedures: ServiceTicketDto[];
  tickets: DoctorTicketDto[];
  home: DoctorTicketDto[];
  isAuthenticated: boolean;
  closeResult: string; //for confirmationModal

  constructor(private modalService: NgbModal, private http: HttpClient, public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.getPlannedVisits();
    this.isAuthenticated = sessionStorage.getItem('token') ? true : false;
  }

  goToPersonalAccount() {
    this.router.navigateByUrl('/account');
  }

  cancelAnalysis(id: number) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + sessionStorage.getItem('token')
    });
    this.http.put<any>(`${this.apiServerUrl}/services/analysis/free/` + id, {}, { headers: headers }).subscribe(
      (response: any) => {
        this.analyses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  cancelProcedure(id: number) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + sessionStorage.getItem('token')
    });
    this.http.put<any>(`${this.apiServerUrl}/services/procedure/free/` + id, {}, { headers: headers }).subscribe(
      (response: any) => {
        this.procedures = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  cancelTicket(id: number) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + sessionStorage.getItem('token')
    });
    this.http.put<any>(`${this.apiServerUrl}/order/free/` + id, {}, { headers: headers }).subscribe(
      (response: any) => {
        this.tickets = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  cancelHouses(id: number) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + sessionStorage.getItem('token')
    });
    this.http.put<any>(`${this.apiServerUrl}/order/free/` + id, {}, { headers: headers }).subscribe(
      (response: any) => {
        this.home = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openModal(content: any, ticketId: number, method: string) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        if (method === 'analysis') {
          this.cancelAnalysis(ticketId);
        }
        else if (method === 'procedure') {
          this.cancelProcedure(ticketId);
        }
        else if (method === 'ticket') {
          this.cancelTicket(ticketId);
        }
        else {
          this.cancelHouses(ticketId);
        }
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