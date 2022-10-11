import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.scss']
})
export class LivroComponent {

  @Input() livro!: any;

  onEsseJaLi() {
    let leitor = this.getLeitor();
    console.log(leitor);

    if (leitor.pontos) {
      leitor.pontos += 1;
      leitor.pontos += this.getPontosPorPaginas();
    }
    else {
      leitor.pontos = 1;
    }

    this.setLeitor(leitor);
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
