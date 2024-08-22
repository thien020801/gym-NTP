import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employees } from '../app/Models/Employees';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(`${this.apiUrl}/get/employees`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/employees/${id}`);
  }
  
  getEmployeeById(id: number): Observable<Employees> {
    return this.http.get<Employees>(`${this.apiUrl}/get/employees/${id}`);
  }

  updateEmployee(id: number, employee: Employees): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.apiUrl}/put/employees/${id}`, employee, { headers });
  }
}
