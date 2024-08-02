import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private login_url =
    'https://desenvolvimento.maxdata.com.br/api/v1/Auth/login';
  private api_url = 'https://desenvolvimento.maxdata.com.br/api/v1/Cadastro';
  private cep_url = 'https://opencep.com/v1';

  constructor(private http: HttpClient) {}

  login(user_login: any) {
    this.http.post<any>(this.login_url, user_login).subscribe(
      (response) => {
        const accessToken = response.access_token;
        localStorage.setItem('access_token', accessToken);
        console.log('Login bem-sucedido, token armazenado.');
      },
      (error) => {
        console.error('Erro no login:', error);
      }
    );
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  createClient(client: any): Observable<any> {
    return this.http.post<any>(this.api_url, client, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAccessToken()}`,
      }),
    });
  }

  getClients(): Observable<Client[]> {
    const url = `${this.api_url}?limit=500`;
    return this.http.get<Client[]>(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getAccessToken()}`,
      }),
    });
  }

  getClientById(id: number): Observable<Client> {
    const url = `${this.api_url}/${id}`;
    return this.http.get<Client>(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getAccessToken()}`,
      }),
    });
  }

  editClient(client: any, id: String): Observable<any> {
    const url = `${this.api_url}/${id}`;
    return this.http.put<any>(url, client, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAccessToken()}`,
      }),
    });
  }

  disableClient(client: any, id: String): Observable<any> {
    const url = `${this.api_url}/${id}`;
    return this.http.put<any>(url, client, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAccessToken()}`,
      }),
    });
  }

  openCEP(cep: any) {
    const url = `${this.cep_url}/${cep}`;
    return this.http.get<any>(url);
  }
}
