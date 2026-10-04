import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { installMatchMediaMock } from '../../testing/match-media';
import { BrasilApiService } from '../brasil-api.service';
import { Cadastro } from './cadastro';

describe('Cadastro', () => {
  let component: Cadastro;
  let fixture: ComponentFixture<Cadastro>;
  let ufsResponse: Subject<{ sigla: string; nome: string }[]>;

  beforeEach(async () => {
    installMatchMediaMock();
    ufsResponse = new Subject<{ sigla: string; nome: string }[]>();

    await TestBed.configureTestingModule({
      imports: [Cadastro],
      providers: [
        provideRouter([]),
        {
          provide: BrasilApiService,
          useValue: {
            listarUfs: (): Observable<{ sigla: string; nome: string }[]> =>
              ufsResponse.asObservable(),
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
    ufsResponse.next([
      { sigla: 'SP', nome: 'São Paulo' },
      { sigla: 'RJ', nome: 'Rio de Janeiro' },
    ]);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load state abbreviations from Brasil API', () => {
    expect(component.ufs).toEqual(['SP', 'RJ']);
  });

  it('should display a saved state after the state options load asynchronously', async () => {
    component.cliente.uf = 'SP';
    component.ufs = [];
    component.carregarUfs();
    fixture.detectChanges();

    ufsResponse.next([
      { sigla: 'SP', nome: 'São Paulo' },
      { sigla: 'RJ', nome: 'Rio de Janeiro' },
    ]);
    await fixture.whenStable();
    fixture.detectChanges();

    const ufSelect = fixture.debugElement.query(By.directive(MatSelect)).componentInstance as MatSelect;
    expect(ufSelect.triggerValue).toBe('SP');
  });

  it('should load municipalities for the selected state and clear the previous selection', () => {
    component.cliente.municipio = 'Campinas';

    component.aoAlterarUf('SP');

    expect(component.municipios).toEqual(['São Paulo', 'Campinas']);
    expect(component.cliente.municipio).toBeUndefined();
  });
});
