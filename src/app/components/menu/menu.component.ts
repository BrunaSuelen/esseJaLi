import { Component, OnInit } from '@angular/core';
import { TrofeuService } from 'src/app/service/trofeu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  leitor!: any;
  trofeus!: any[];

  constructor(private trofeuService: TrofeuService) { }

  ngOnInit(): void {
    this.leitor = this.getLeitor();
    this.getTrofeus()
  }

  getLeitor(): any {
    const leitor = localStorage.getItem('_user_');

    if (leitor) {
      return JSON.parse(leitor);
    }
  }

  getTrofeus(): any {
    this.trofeuService
      .findByLeitor(this.leitor.id)
      .subscribe(
        (data: any) => {
          this.trofeus = data;
        }
      )
  }

  refreshDados() {
    this.leitor = this.getLeitor();
    this.getTrofeus()
  }
}
