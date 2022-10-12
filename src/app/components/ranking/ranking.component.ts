import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getLeitores(): any {
    let postos = [];
    this.userService
      .get()
      .subscribe(
        (data: any) => {
          data?.forEach((leitor: any) => {

          });
        }
      )
  }
}
