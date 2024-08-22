import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  private apiUrl = 'http://localhost:5000/api/post/signin'; // Thay đổi URL này nếu cần

  constructor(private http: HttpClient) { }

  signIn(phoneNumber: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { phoneNumber, password };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(response => {
        if (response.success) {
          // Lưu thông tin người dùng vào local storage hoặc xử lý logic khác
          localStorage.setItem('currentUser', JSON.stringify(response.employee));
          return response.employee;
        } else {
          throw new Error(response.message);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  logout(): void {
    // Xóa thông tin người dùng khi đăng xuất
    localStorage.removeItem('currentUser');
  }
}
