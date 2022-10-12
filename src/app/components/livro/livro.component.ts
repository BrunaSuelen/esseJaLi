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
  alert!: { text: string, show: boolean, class: string };

  constructor(
    private livroService: LivroService,
    private trofeuService: TrofeuService
  ) {}

  ngOnInit(): void {
    this.leitor = this.getLeitor();
  }

  onEsseJaLi() {
    this.livroService
      .lerLivro(this.livro.id, this.leitor.id, this.livro.genero)
      .subscribe(
        (data: any) => {
          this.leitor.pontos += 1;
          this.leitor.pontos += this.getPontosPorPaginas();

          this.onAlert((this.getPontosPorPaginas() + 1) + ' Pontos Adquiridos', 'alert-success', 5000);
          this.validarEntregaTrofeu();
          this.setLeitor(this.leitor);
        }
      );
  }

  onAlert(text: string, className: string, timeout: number): void {
    this.alert = { text, show: true, class: className }

    setTimeout(() => {
      this.alert = {
        text: '',
        show: false,
        class: ''
      }
    }, timeout);
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
          this.onAlert('Troféu adquirido!!', 'alert-success', 5000);
        }
      )
  }
}
