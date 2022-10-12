import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class TrofeuService {

  constructor(private http: HttpClient) { }

  findByLeitor(leitorId: number): Observable<any> {
    return this.http
      .get('http://localhost:3000/trofeu?leitor='+leitorId);
  }

  createTrofeu(leitorId: number, genero: string): Observable<any> {
    return this.http
      .post('http://localhost:3000/trofeu',
        { leitor: leitorId, genero }
      );
  }
}
