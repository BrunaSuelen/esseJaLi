import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListaLivroComponent } from './components/lista-livro/lista-livro.component';
import { MenuComponent } from './components/menu/menu.component';
import { LivroComponent } from './components/livro/livro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListaLivroComponent,
    MenuComponent,
    LivroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
