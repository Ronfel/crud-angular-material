import { Routes } from '@angular/router';
import { Cadastro } from './cadastro/cadastro';
import { Consulta } from './consulta/consulta';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'cadastro/novo', component: Cadastro },
    { path: 'cadastro', component: Cadastro},
    { path: 'consulta', component: Consulta },
    { path: '**', redirectTo: '' },
];
