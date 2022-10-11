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
  livroSelect: any;

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

  getLeitor(): any {
    const leitor = localStorage.getItem('_user_');

    if (leitor) {
      return JSON.parse(leitor);
    }
  }

  onSelectLivro(livro: any): void {
    this.livroSelect = livro;
    this.findLeitorLivro();
  }

  findLeitorLivro() {
    const leitor = this.getLeitor();

    this.livroService
      .findLeitorLivro(this.livroSelect.id, leitor.id)
      .subscribe(
        (data: any) => {
          this.livroSelect.lido = data && data[0];
        }
      );
  }
}
