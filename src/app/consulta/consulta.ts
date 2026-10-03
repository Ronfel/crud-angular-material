import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cliente as ClienteService } from '../cliente';
import { Cliente } from '../cadastro/cliente';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

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
export class Consulta implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Cliente>([]);
  colunasTable: string[] = ['nome', 'cpf', 'telefone', 'email', 'dataNascimento', 'acoes'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ClienteService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.dataSource.data = this.service.pesquisar('');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  pesquisar(nome: string = ''): void {
    this.dataSource.data = this.service.pesquisar(nome.trim());
    this.paginator.firstPage();
  }

  editar(id: string): void {
    console.log('Editar cliente com ID: ', id);
    this.router.navigate(['/cadastro'], { queryParams: { id } });
  }
}
