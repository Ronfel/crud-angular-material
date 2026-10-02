import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Cliente as ClienteService } from '../cliente';
import { Cliente } from '../cadastro/cliente';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  imports: [
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    MatPaginator
],
  selector: 'app-consulta',
  styleUrl: './consulta.scss',
  templateUrl: './consulta.html',
})
export class Consulta {
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['nome', 'cpf', 'telefone', 'email', 'dataNascimento'];

  constructor(private service: ClienteService) {
  }

  ngOnInit() {
    this.listaClientes = this.service.pesquisar('');
  }

  pesquisar(nome: string = '') {
    this.listaClientes = this.service.pesquisar(nome.trim());
  }
}
