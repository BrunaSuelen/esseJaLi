import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { TrofeuService } from 'src/app/service/trofeu.service';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.scss']
})
export class LivroComponent implements OnInit{

  @Input() livro!: any;
  leitor: any;

  constructor(
    private livroService: LivroService,
    private trofeuService: TrofeuService
  ) {}

  ngOnInit(): void {
    this.leitor = this.getLeitor();
  }

  onEsseJaLi() {
    this.livroService
      .lerLivro(this.livro.id, this.leitor.id)
      .subscribe(
        (data: any) => {
          const pontos = this.leitor.pontos;

          this.leitor.pontos += pontos ? pontos + 1 : 1;
          this.leitor.pontos += this.getPontosPorPaginas();
          this.validarEntregaTrofeu();
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

  getLabelButton(): string {
    return (this.livro?.lido)
      ? `Li e colhi ${this.getPontosPorPaginas() + 1} Pontos!!`
      : "Esse já li!"
  }

  validarEntregaTrofeu(): any {
    this.livroService
      .findLeitorLivroByLeitorEGenero(this.leitor.id, this.livro.genero)
      .subscribe(
        (data: any) => {
          console.log(data)

          if (data && data.length == 5) {
            this.setTrofeu();
          }
        }
      )
  }

  setTrofeu(): void {
    this.trofeuService
      .createTrofeu(this.leitor.id, this.livro.genero)
      .subscribe(
        (data: any) => {
          console.log(data);
        }
      )
  }
}
