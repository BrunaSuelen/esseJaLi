import { Component, Input, OnInit } from '@angular/core';
import { TrofeuService } from 'src/app/service/trofeu.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  @Input() leitor!: any;
  @Input() trofeus!: any[];

  constructor() { }

  ngOnInit(): void {}
}
