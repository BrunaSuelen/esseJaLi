import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLivroComponent } from './components/lista-livro/lista-livro.component';
import { LoginComponent } from './components/login/login.component';
import { RankingComponent } from './components/ranking/ranking.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'lista-livros', component: ListaLivroComponent },
  { path: 'ranking', component: RankingComponent },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
