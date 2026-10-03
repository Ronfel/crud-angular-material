import { Injectable } from '@angular/core';
import { Cliente as Cli } from './cadastro/cliente';

@Injectable({ providedIn: 'root' })
export class Cliente {

    static REPO_CLIENTES = '_CLIENTES';

    constructor() { }

    salvar(cliente: Cli) {
        const storage = this.obterStorage();
        storage.push(cliente);
        localStorage.setItem(Cliente.REPO_CLIENTES, JSON.stringify(storage));
        console.log('Cliente salvo: ', cliente);
    }

    pesquisar(nome: string): Cli[] {
        const clientes = this.obterStorage();
        const termo = (nome ?? '').trim().toLowerCase();

        if (!termo) {
            return clientes;
        }

        return clientes.filter(c => c.nome?.toLowerCase().includes(termo));
    }

    buscarPorId(id: string): Cli | undefined {
        return this.obterStorage().find(c => c.id === id);
    }

    private obterStorage(): Cli[] {
        let clientes: Cli[] = [];
        const clientesStorage = localStorage.getItem(Cliente.REPO_CLIENTES);

        if (clientesStorage) {
            try {
                clientes = JSON.parse(clientesStorage) ?? [];
            } catch {
                clientes = [];
            }
        }

        localStorage.setItem(Cliente.REPO_CLIENTES, JSON.stringify(clientes));
        return clientes;
    }

    atualizar(cliente: Cli): void {
        const storage = this.obterStorage();
        const index = storage.findIndex(c => c.id === cliente.id);

        if (index >= 0) {
            storage[index] = cliente;
            localStorage.setItem(Cliente.REPO_CLIENTES, JSON.stringify(storage));
        }
    }
}
