import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EstadoBrasilApi {
  sigla: string;
  nome: string;
}

export interface MunicipioBrasilApi {
  nome: string;
  codigo_ibge: string;
}

@Injectable({ providedIn: 'root' })
export class BrasilApiService {
  private readonly baseUrl = 'https://brasilapi.com.br/api/ibge';

  constructor(private http: HttpClient) {}

  listarUfs(): Observable<EstadoBrasilApi[]> {
    return this.http.get<EstadoBrasilApi[]>(`${this.baseUrl}/uf/v1`);
  }

  listarMunicipios(uf: string): Observable<MunicipioBrasilApi[]> {
    return this.http.get<MunicipioBrasilApi[]>(
      `${this.baseUrl}/municipios/v1/${encodeURIComponent(uf)}`
    );
  }
}
