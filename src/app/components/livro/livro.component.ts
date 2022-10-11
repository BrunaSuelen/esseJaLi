import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.scss']
})
export class LivroComponent implements OnInit{

  @Input() livro!: any;

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
  }

  onEsseJaLi() {
    let leitor = this.getLeitor();
    console.log(leitor);

    this.livroService
      .lerLivro(this.livro.id, leitor.id)
      .subscribe(
        (data: any) => {
          console.log(data);

          if (leitor.pontos) {
            leitor.pontos += 1;
            leitor.pontos += this.getPontosPorPaginas();
          }
          else {
            leitor.pontos = 1;
          }
        }
      );
  }

  getPontosPorPaginas(): number {
    const pontoExtra = this.livro.paginas / 100;
    return Math.trunc(pontoExtra);
  }

  getLeitor(): any {
    const leitor = localStorage.getItem('_user_');

    if (leitor) {
      return JSON.parse(leitor);
    }
  }

  setLeitor(leitor: any): void {
    return localStorage.setItem('_user_', JSON.stringify(leitor));
  }
}
