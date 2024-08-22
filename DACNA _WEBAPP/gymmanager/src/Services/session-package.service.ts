import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionPackage } from '../app/Models/SessionPackage'

@Injectable({
  providedIn: 'root'
})
export class SessionPackageService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  createSessionPackage(subscription: Partial<SessionPackage>): Observable<SessionPackage[]> {
    return this.http.post<SessionPackage[]>(
      `${this.apiUrl}/post/session-subscriptions`,
      subscription
    );
  }

  getSessionPackage(): Observable<SessionPackage[]> {
    return this.http.get<SessionPackage[]>(
      `${this.apiUrl}/get/session-subscriptions`
    );
  }

  deleteSessionPackage(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/delete/session-subscriptions/${id}`
    );
  }

  updateSessionPackage( sessionpackage: SessionPackage): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/put/session-subscriptions/${sessionpackage.SessionSubscriptionID}`,
      sessionpackage
    );
  }
}
