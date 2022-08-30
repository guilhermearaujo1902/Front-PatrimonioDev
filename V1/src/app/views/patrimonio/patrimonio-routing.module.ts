import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../services/auth/auth.guard";
import { ListarpatrimonioComponent } from "./listagem-patrimonio/listagem-patrimonio.component";
import { PatrimonioComponent } from "./patrimonio.component";

const routes: Routes = [

  {
    path: 'patrimonio',
    component: PatrimonioComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'patrimonio',
    }
  },
  {
    path: 'patrimonio/:codigoPatrimonio',
    component: PatrimonioComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'patrimonio',
    }
  },
  {
    path: 'listar-patrimonio',
    component: ListarpatrimonioComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'listar-patrimonio',
    }
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PatrimonioRoutingModule { }
