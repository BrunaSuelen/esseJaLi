import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get('http://localhost:3000/leitor');
  }

  findByEmail(email: string): Observable<any> {
    return this.http.get('http://localhost:3000/leitor?email='+ email);
  }
}
