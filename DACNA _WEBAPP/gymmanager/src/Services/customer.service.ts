import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../app/Models/Customers';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  signUp(userData: any): Observable<Customers[]> {
    console.log('Sending user data to API:', userData); // Kiểm tra dữ liệu trước khi gửi tới API
    return this.http.post<Customers[]>(`${this.apiUrl}/post/customers`, userData);
  }

  getCustomers(): Observable<Customers[]> {
    return this.http.get<Customers[]>(`${this.apiUrl}/get/customers`);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/customers/${id}`);
  }

  updateCustomer(customer: Customers): Observable<any> {
    return this.http.put(`${this.apiUrl}/put/customers/${customer.CustomerID}`, customer);
  }
}
