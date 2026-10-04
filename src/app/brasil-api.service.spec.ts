import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrasilApiService } from './brasil-api.service';

describe('BrasilApiService', () => {
  let service: BrasilApiService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'https://brasilapi.com.br/api/ibge';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BrasilApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return states from Brasil API', () => {
    const estados = [{ sigla: 'SP', nome: 'São Paulo' }];

    service.listarUfs().subscribe(resultado => {
      expect(resultado).toEqual(estados);
    });

    httpTestingController.expectOne(`${baseUrl}/uf/v1`).flush(estados);
  });

  it('should return municipalities for the selected state', () => {
    const municipios = [{ nome: 'São Paulo', codigo_ibge: '3550308' }];

    service.listarMunicipios('SP').subscribe(resultado => {
      expect(resultado).toEqual(municipios);
    });

    httpTestingController.expectOne(`${baseUrl}/municipios/v1/SP`).flush(municipios);
  });
});
