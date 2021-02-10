import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AuthGuard } from './auth/auth.guard';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [{
  path: '', component: NavbarComponent,
  children: [
    { path: '', redirectTo: 'protocolo', pathMatch: 'full' },
    {
      path: 'protocolo',
      loadChildren: () => import('./protocolo/protocolo.module').then(m => m.ProtocoloModule)
    },
    { path: 'nao-autorizado', component: NaoAutorizadoComponent },

  ],
  canActivate: [AuthGuard],
},


{ path: 'login', component: LoginComponent },
{ path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
{ path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
