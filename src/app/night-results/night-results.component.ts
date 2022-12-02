import { Component, OnInit } from '@angular/core';
import { PlayerService } from "../shared/_services/player.service";

@Component({
  selector: 'app-night-results',
  templateUrl: './night-results.component.html',
  styleUrls: ['./night-results.component.scss']
})
export class NightResultsComponent implements OnInit {

  statistics: Array<any> = []

  constructor(private players: PlayerService) { }

  ngOnInit(): void {
    this.players.getNightStats().subscribe({
      next: response => {
        console.log(response);
        this.statistics = response.data;
        this.initiateStats(response.data);
      },
      error: error => {
        console.log(error)
      }
    })
  }

  initiateStats(statistics: Array<any>){
    statistics.sort((a: any, b: any)=> {
      if(a.stats.score < b.stats.score){ return 1}
      else if(a.stats.score > b.stats.score){ return -1}
      else { return 0}
    });
  }

}
