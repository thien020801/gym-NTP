import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainers } from '../app/Models/Trainers';

@Injectable({
  providedIn: 'root'
})
export class PtService {

  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getTrainers(): Observable<Trainers[]> {
    return this.http.get<Trainers[]>(`${this.apiUrl}/get/trainers`);
  }

  deleteTrainers(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/trainers/${id}`);
  }

  updateTrainers(trainer: Trainers): Observable<any> {
    return this.http.put(`${this.apiUrl}/put/trainers/${trainer.TrainerID}`, trainer);
  }
}
