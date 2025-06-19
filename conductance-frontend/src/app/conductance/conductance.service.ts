import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConductanceService {
  private apiUrl = 'http://localhost:8080/api/conductance'; // adjust this if your backend path differs

  constructor(private http: HttpClient) {}

  calculateConductance(data: { voltage: number[]; current: number[] }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/calculate`, data);
  }
}
