import { v4 as uuid } from 'uuid';

export class Cliente {
    id?: string;
    nome?: string;
    cpf?: string;
    dataNascimento?: string;
    email?: string;
    telefone?: string;

    static newCliente(): Cliente {
        let cliente = new Cliente();
        cliente.id = uuid();
        return cliente;
    }
}