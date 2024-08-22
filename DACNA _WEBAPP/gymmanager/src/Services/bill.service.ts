import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Bill } from '../app/Models/Bills';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = 'http://localhost:5000/api';
  baseUrl: any;

  constructor(private http: HttpClient) {}

  getLatestBillIDByCustomer(customerID: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get/latestbillidbycustomer/${customerID}`).pipe(
      catchError((error) => throwError(error))
    );
  }
  

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}/get/bills`);
  }

  createBill(bill: Bill): Observable<any> {
    return this.http.post(`${this.apiUrl}/post/bills`, bill);
  }
}
