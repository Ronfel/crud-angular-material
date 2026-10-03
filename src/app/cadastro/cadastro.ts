import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { Cliente } from './cliente';
import { Cliente as ClienteService } from '../cliente';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  selector: 'app-cadastro',
  styleUrl: './cadastro.scss',
  templateUrl: './cadastro.html',
})
export class Cadastro implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  modoEdicao = false;
  confirmandoExclusao = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private destroyRef: DestroyRef
  ) {
  }

  ngOnInit(): void {
    this.carregarClienteDaRota();
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.carregarClienteDaRota());
  }

  private carregarClienteDaRota(): void {
    const id = this.router.parseUrl(this.router.url).queryParams['id'];
    const clienteEncontrado = typeof id === 'string'
      ? this.clienteService.buscarPorId(id)
      : undefined;

    this.cliente = clienteEncontrado ?? Cliente.newCliente();
    this.modoEdicao = !!clienteEncontrado;
    this.confirmandoExclusao = false;
  }

  salvar(){
    if (this.modoEdicao) {
      this.clienteService.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      return;
    }

    this.clienteService.salvar(this.cliente);
    this.cliente = Cliente.newCliente();
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
}
