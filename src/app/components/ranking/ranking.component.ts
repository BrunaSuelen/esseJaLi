import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  ranking!: any[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getLeitores()
  }

  getLeitores(): any {
    this.userService
      .get()
      .subscribe(
        (data: any) => {
          console.log(data)
          const ordeByPontos = data.sort(function (x: any, y: any) {
            return x.pontos - y.pontos
          });

          this.ranking = ordeByPontos.reverse().splice(0, 10);
        }
      )
  }
}
