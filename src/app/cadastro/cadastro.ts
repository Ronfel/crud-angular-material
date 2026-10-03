import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
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
export class Cadastro {

  cliente: Cliente = Cliente.newCliente();
  modoEdicao = false;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        const clienteEncontrado = this.clienteService.buscarPorId(id);
        if (clienteEncontrado) {
          this.cliente = clienteEncontrado;
          this.modoEdicao = true;
          return;
        }
      }

      this.cliente = Cliente.newCliente();
      this.modoEdicao = false;
    });
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
}
