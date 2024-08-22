import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Attendance } from '../app/Models/Attendance'; // Create an Attendance model similar to Customers

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  getAttendancesByCustomer(CustomerID: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getLatestBillIDByCustomer(customerID: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get/latestbillidbycustomer/${customerID}`).pipe(
      catchError((error) => throwError(error))
    );
  }

  createAttendance(attendanceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/post/attendance`, attendanceData);
  }

  getAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/get/attendance`);
  }

  updateAttendance(id: number, attendanceData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/put/attendance/${id}`, attendanceData);
  }

  deleteAttendance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/attendance/${id}`);
  }
}
