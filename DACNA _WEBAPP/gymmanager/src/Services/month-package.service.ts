import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthPackage } from '../app/Models/MonthPackage';

@Injectable({
  providedIn: 'root',
})
export class MonthPackageService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  createMonthPackage(subscription: Partial<MonthPackage>): Observable<MonthPackage[]> {
    return this.http.post<MonthPackage[]>(
      `${this.apiUrl}/post/monthly-subscriptions`,
      subscription
    );
  }

  getMonthPackage(): Observable<MonthPackage[]> {
    return this.http.get<MonthPackage[]>(
      `${this.apiUrl}/get/monthly-subscriptions`
    );
  }

  deleteMonthPackage(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/delete/monthly-subscriptions/${id}`
    );
  }

  updateMonthPackage(monthpackage: MonthPackage): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/put/monthly-subscriptions/${monthpackage.MonthlySubscriptionID}`,
      monthpackage
    );
  }
}
