import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from './cliente';
import { Cliente as ClienteService } from '../cliente';

@Component({
  standalone: true,
  imports: [
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
export class Cadastro {

  cliente: Cliente = Cliente.newCliente();

  constructor(private clienteService: ClienteService) {

  }

  salvar(){
    this.clienteService.salvar(this.cliente);
    this.cliente = Cliente.newCliente(); 
  }

  atualizar(){
    this.clienteService.atualizar(this.cliente);
  }
}
