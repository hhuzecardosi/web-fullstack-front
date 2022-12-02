import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/_services/user.service";
import { StorageService } from "../shared/_services/storage.service";
// @ts-ignore
import * as _ from "lodash";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user_email: undefined | string;
  user_pseudo: undefined | string;
  user_score: undefined | number;
  blacklist: any = [];
  history: any = [];

  constructor(private user: UserService, private storage: StorageService) { }

  ngOnInit(): void {

    this.user.getBlacklistObservable().subscribe({
      next : response => {
        if (response.code === 200){
          this.blacklist = response.data;
          this.storage.setItem('blacklist', JSON.stringify(response.data));
          this.initiateBlacklist();
        }
      },
      error: error => {
        // @ts-ignore
        this.blacklist = JSON.parse(this.storage.getItem('blacklist') !== null ? this.storage.getItem('blacklist') : '[]');
        console.log(error)
      }
    });

    this.user.getHistoryObservable().subscribe({
      next : response => {
        if (response.code === 200){ this.history = response.data }
        this.sortHistory();
        this.computeScore();
      },
      error: error => {
        console.log(error)
        this.history = []
      }
    });

    this.initiateUser();
  }

  initiateUser(){
    let user = this.storage.getItem('user') !== null ? this.storage.getItem('user') : '{}';
    // @ts-ignore
    user = JSON.parse(user)
    this.user_email = _.get(user, 'email', '');
    this.user_pseudo = _.get(user, 'pseudo', '');
  }

  sortHistory(){
    this.history.sort((a: any, b: any)=> {
      if(new Date(a.date) < new Date(b.date)){ return 1}
      else if(new Date(a.date) > new Date(b.date)){ return -1}
      else { return 0}
    });
  }

  initiateBlacklist(){
    const blacklist: Array<any> = []
    this.blacklist.forEach((db_player: any) => {
      let diff = Math.abs(new Date(db_player.to).getTime() - new Date().getTime());
      let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      blacklist.push({'player_name': db_player.player.name, 'player_id': db_player.player._id, 'days': diffDays})
    });
    blacklist.sort((a: any, b: any) => {
      if(a.days > b.days){return 1}
      else if(a.days < b.days){return -1}
      else { return 0 }
    });
    this.blacklist = blacklist
    console.log(this.blacklist)
  }

  computeScore(){
    this.user_score = 0
    this.history.forEach((choice: any) => {
      this.user_score += choice.stats.score;
    })
  }
}
