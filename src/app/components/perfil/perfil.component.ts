import { Component, OnInit } from '@angular/core';
import { TrofeuService } from 'src/app/service/trofeu.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  leitor!: any;
  trofeus!: any[];

  constructor(private trofeuService: TrofeuService) { }

  ngOnInit(): void {
    this.leitor = this.getLeitor();
    this.getTrofeus();
    console.log(this.leitor)
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
}
