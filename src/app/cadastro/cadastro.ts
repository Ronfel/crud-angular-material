import { ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Subscription } from 'rxjs';
import { Cliente } from './cliente';
import { Cliente as ClienteService } from '../cliente';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BrasilApiService } from '../brasil-api.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    NgxMaskDirective,
   
  ], providers: [
    provideNgxMask()
  ],
  selector: 'app-cadastro',
  styleUrl: './cadastro.scss',
  templateUrl: './cadastro.html',
})
export class Cadastro implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  modoEdicao = false;
  confirmandoExclusao = false;
  ufs: string[] = [];
  carregandoUfs = false;
  erroCarregamentoUfs = false;
  municipios: string[] = [];
  carregandoMunicipios = false;
  erroCarregamentoMunicipios = false;
  private municipiosSubscription?: Subscription;
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private destroyRef: DestroyRef,
    private brasilApiService: BrasilApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.carregarClienteDaRota();
    this.carregarUfs();
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.carregarClienteDaRota());
  }

  carregarUfs(): void {
    if (this.carregandoUfs) {
      return;
    }

    this.carregandoUfs = true;
    this.erroCarregamentoUfs = false;
    this.brasilApiService.listarUfs()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: estados => {
          this.ufs = estados.map(estado => estado.sigla);
          this.carregandoUfs = false;
          this.changeDetectorRef.markForCheck();
        },
        error: () => {
          this.carregandoUfs = false;
          this.erroCarregamentoUfs = true;
          this.mostrarMensagem('Não foi possível carregar as UFs. Tente novamente.');
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  aoAlterarUf(uf: string | undefined): void {
    this.cliente.municipio = undefined;
    this.municipios = [];
    this.erroCarregamentoMunicipios = false;

    if (uf) {
      this.carregarMunicipios(uf);
    } else {
      this.municipiosSubscription?.unsubscribe();
      this.carregandoMunicipios = false;
    }
  }

  carregarMunicipios(uf: string, limparSelecao = true): void {
    this.municipiosSubscription?.unsubscribe();
    if (limparSelecao) {
      this.cliente.municipio = undefined;
    }
    this.municipios = [];
    this.carregandoMunicipios = true;
    this.erroCarregamentoMunicipios = false;
    this.municipiosSubscription = this.brasilApiService.listarMunicipios(uf)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: municipios => {
          this.municipios = municipios.map(municipio => municipio.nome);
          this.carregandoMunicipios = false;
          this.changeDetectorRef.markForCheck();
        },
        error: () => {
          this.carregandoMunicipios = false;
          this.erroCarregamentoMunicipios = true;
          this.mostrarMensagem('Não foi possível carregar os municípios. Tente novamente.');
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  private carregarClienteDaRota(): void {
    const id = this.router.parseUrl(this.router.url).queryParams['id'];
    const clienteEncontrado = typeof id === 'string'
      ? this.clienteService.buscarPorId(id)
      : undefined;

    this.cliente = clienteEncontrado ?? Cliente.newCliente();
    this.modoEdicao = !!clienteEncontrado;
    this.confirmandoExclusao = false;
    this.municipiosSubscription?.unsubscribe();
    this.municipios = [];
    this.carregandoMunicipios = false;
    this.erroCarregamentoMunicipios = false;
    if (this.cliente.uf) {
      this.carregarMunicipios(this.cliente.uf, false);
    }
  }

  salvar(){
    if (this.modoEdicao) {
      this.clienteService.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem('Cliente atualizado com sucesso!');
      return;
    }

    this.clienteService.salvar(this.cliente);
    this.cliente = Cliente.newCliente();
    this.mostrarMensagem('Cliente cadastrado com sucesso!');
  }

  excluir(): void {
    if (!this.modoEdicao || !this.cliente.id) {
      return;
    }

    this.clienteService.excluir(this.cliente.id);
    this.router.navigate(['/consulta']);
  }

  cancelarExclusao(): void {
    this.confirmandoExclusao = false;
  }

  mostrarMensagem(mensagem: string): void {
    this.snack.open(mensagem, 'Ok', {
      duration: 3000,
    });
  }
}
