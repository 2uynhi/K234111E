import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fashion } from './fashion';

@Injectable({
  providedIn: 'root'
})
export class FashionService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getFashions(): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.apiUrl}/fashions`, { withCredentials: true });
  }

  getFashionsByStyle(style: string): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.apiUrl}/fashions/style/${style}`, { withCredentials: true });
  }

  getFashionById(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.apiUrl}/fashions/${id}`, { withCredentials: true });
  }

  addFashion(fashion: Fashion): Observable<Fashion> {
    return this.http.post<Fashion>(`${this.apiUrl}/fashions`, fashion, { withCredentials: true });
  }

  updateFashion(id: string, fashion: Fashion): Observable<any> {
    return this.http.put(`${this.apiUrl}/fashions/${id}`, fashion, { withCredentials: true });
  }

  deleteFashion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/fashions/${id}`, { withCredentials: true });
  }

  addToCart(fashion: Fashion): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart`, fashion, { withCredentials: true });
  }

  getCart(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cart`, { withCredentials: true });
  }
}
