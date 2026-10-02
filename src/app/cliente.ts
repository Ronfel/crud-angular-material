import { Service } from '@angular/core';
import { Cliente as Cli } from './cadastro/cliente';

@Service()
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
        let clientes: Cli[] = [];
        let clientesStorage = localStorage.getItem(Cliente.REPO_CLIENTES);
        if (clientesStorage) {
            clientes = JSON.parse(clientesStorage);
            return clientes.filter(c => c.nome?.toLowerCase().includes(nome.toLowerCase()));
        }
        return clientes;
    }

    private obterStorage(): Cli[] {
        let clientes: Cli[] = [];
        let clientesStorage = localStorage.getItem(Cliente.REPO_CLIENTES);
        if (clientesStorage) {
            clientes = JSON.parse(clientesStorage);
            return clientes;
        }
        localStorage.setItem(Cliente.REPO_CLIENTES, JSON.stringify(clientes));
        return clientes;
    }
    
    atualizar(cliente: Cli) {
        console.log('Cliente atualizado: ', cliente);
    }
}
