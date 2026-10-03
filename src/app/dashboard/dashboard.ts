import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Cliente as ClienteService } from '../cliente';
import { Cliente } from '../cadastro/cliente';

@Component({
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  totalClientes = 0;
  clientesAtivos = 0;
  clientesInativos = 0;
  clientesRecentes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    const clientes = this.clienteService.pesquisar('');
    this.totalClientes = clientes.length;
    this.clientesAtivos = clientes.filter(cliente => cliente.ativo !== false).length;
    this.clientesInativos = clientes.filter(cliente => cliente.ativo === false).length;
    this.clientesRecentes = clientes.slice(-5).reverse();
  }

  get graficoPizza(): string {
    if (this.totalClientes === 0) {
      return 'conic-gradient(#e0e0e0 0% 100%)';
    }

    const percentualAtivos = (this.clientesAtivos / this.totalClientes) * 100;
    return `conic-gradient(#225bed 0% ${percentualAtivos}%, #de2929 ${percentualAtivos}% 100%)`;
  }
}
