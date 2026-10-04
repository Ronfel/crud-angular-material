import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { installMatchMediaMock } from '../../testing/match-media';
import { BrasilApiService } from '../brasil-api.service';
import { Cadastro } from './cadastro';

describe('Cadastro', () => {
  let component: Cadastro;
  let fixture: ComponentFixture<Cadastro>;

  beforeEach(async () => {
    installMatchMediaMock();

    await TestBed.configureTestingModule({
      imports: [Cadastro],
      providers: [
        provideRouter([]),
        {
          provide: BrasilApiService,
          useValue: {
            listarUfs: () => of([
              { sigla: 'SP', nome: 'São Paulo' },
              { sigla: 'RJ', nome: 'Rio de Janeiro' },
            ]),
            listarMunicipios: () => of([
              { nome: 'São Paulo', codigo_ibge: '3550308' },
              { nome: 'Campinas', codigo_ibge: '3509502' },
            ]),
          },
        },
        { provide: MatSnackBar, useValue: { open: () => undefined } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Cadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load state abbreviations from Brasil API', () => {
    expect(component.ufs).toEqual(['SP', 'RJ']);
  });

  it('should load municipalities for the selected state and clear the previous selection', () => {
    component.cliente.municipio = 'Campinas';

    component.aoAlterarUf('SP');

    expect(component.municipios).toEqual(['São Paulo', 'Campinas']);
    expect(component.cliente.municipio).toBeUndefined();
  });
});
