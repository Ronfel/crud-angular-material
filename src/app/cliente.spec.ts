import { TestBed } from '@angular/core/testing';
import { Cliente as ClienteService } from './cliente';

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteService);
  });

  it('should mark existing clients active when they have no active status', () => {
    localStorage.setItem('_CLIENTES', JSON.stringify([{ id: '1', nome: 'Cliente antigo' }]));

    const clientes = service.pesquisar('');

    expect(clientes[0].ativo).toBe(true);
    expect(JSON.parse(localStorage.getItem('_CLIENTES') ?? '[]')[0].ativo).toBe(true);
  });

  it('should preserve inactive status for existing clients', () => {
    localStorage.setItem('_CLIENTES', JSON.stringify([
      { id: '1', nome: 'Cliente inativo', ativo: false }
    ]));

    expect(service.buscarPorId('1')?.ativo).toBe(false);
  });
});
