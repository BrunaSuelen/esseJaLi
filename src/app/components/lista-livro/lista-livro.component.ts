import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livro',
  templateUrl: './lista-livro.component.html',
  styleUrls: ['./lista-livro.component.scss']
})
export class ListaLivroComponent implements OnInit {

  livros!: any[];

  constructor(
    private livroService: LivroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLivros();
  }

  getLivros(): void {
    this.livroService
      .get()
      .subscribe(
        (data) => {
          console.log(data)
          this.livros = data;
        }
      )
  }

  teste(): void {

  }
}
