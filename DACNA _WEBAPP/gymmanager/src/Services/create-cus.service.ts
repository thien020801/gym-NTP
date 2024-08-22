import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customers } from '../app/Models/Customers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateCusService {
  private apiUrl = 'http://localhost:5000/api/post/customers';

  constructor(private http: HttpClient) {}

  signUp(userData: any): Observable<Customers[]> {
    console.log('Sending user data to API:', userData); // Kiểm tra dữ liệu trước khi gửi tới API
    return this.http.post<Customers[]>(this.apiUrl, userData);
  }
}
