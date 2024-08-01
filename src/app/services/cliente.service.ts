import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})

export class ClienteService {
  private login_url = 'https://desenvolvimento.maxdata.com.br/api/v1/Auth/login';
  private api_url = 'https://desenvolvimento.maxdata.com.br/api/v1/Cadastro';

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

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.api_url, client, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAccessToken()}`,
      }),
    });
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.api_url, {
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

  updateClient(client: Client): Observable<Client> {
    const url = `${this.api_url}/${client.id}`;
    return this.http.put<Client>(url, client, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAccessToken()}`,
      }),
    });
  }

  deleteClient(id: number): Observable<void> {
    const url = `${this.api_url}/${id}`;
    return this.http.delete<void>(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getAccessToken()}`,
      }),
    });
  }
}
