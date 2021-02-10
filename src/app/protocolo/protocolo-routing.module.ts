import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProtocoloCadastroComponent } from './protocolo-cadastro/protocolo-cadastro.component';


const routes: Routes = [
  { path: '', component: ProtocoloCadastroComponent  },
  { path: ':id', component: ProtocoloCadastroComponent  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProtocoloRoutingModule { }
