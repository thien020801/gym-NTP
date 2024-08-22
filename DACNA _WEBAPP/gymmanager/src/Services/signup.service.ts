// signup.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employees } from '../app/Models/Employees';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private apiUrl = 'http://localhost:5000/api/post/employees';

  constructor(private http: HttpClient) {}

  signUp(userData: any): Observable<Employees[]> {
    console.log('Sending user data to API:', userData); // Kiểm tra dữ liệu trước khi gửi tới API
    return this.http.post<Employees[]>(this.apiUrl, userData);
  }
}
