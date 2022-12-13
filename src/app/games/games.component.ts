import { Component, OnInit } from '@angular/core';
import { GameService } from "../shared/_services/game.service";
import { TeamService } from "../shared/_services/team.service";
import { PlayerService } from "../shared/_services/player.service";
import { StorageService } from "../shared/_services/storage.service";
import * as moment from "moment";
import 'moment/locale/fr'

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  weekGames: any = [];
  weekDays: any = [];
  dayGames: any = [];
  gameTeams: any = [];
  teamPlayers: any = [];
  blacklist: any = [];

  h_team: any = {};
  v_team: any = {};

  selectedDay: undefined | string;
  dayPassed: undefined | boolean;
  selectedGame: undefined | string;
  selectedTeam: undefined | string;

  constructor(private game: GameService, private team: TeamService, private player: PlayerService,
              private storage: StorageService) { }

  ngOnInit(): void {
    moment().locale('fr')
    this.game.getWeekGames().subscribe({
      next: response => {
        this.weekGames = response.data;
        this.initiateDays();
        },
      error: err => {console.log(err)}
    });
    // @ts-ignore
    let blacklist = JSON.parse(this.storage.getItem('blacklist') !== null ? this.storage.getItem('blacklist') : '[]');
    this.initiateBlacklist(blacklist)
  }

  initiateDays(){
    this.weekGames.forEach((day: any) => {
      let date = moment(day.date, 'YYYY-MM-DD');
      let diff = moment().diff(date, 'days');
      this.weekDays.push({'label': date.format('dddd Do MMMM YYYY'), 'date': day.date, 'passed': diff > 0});
    });
  }

  initiateBlacklist(blacklist: any){
    this.blacklist = [];
    blacklist.forEach((db_player: any) => {
      let to = moment(db_player.to, 'YYYY-MM-DD');
      let diff = to.diff(moment(), 'days');
      this.blacklist.push({'player_name': db_player.player.name, 'player_id': db_player.player._id, 'days': diff + 1})
    });
  }

  pickDay(day: any){
    this.gameTeams = []
    this.teamPlayers = []
    this.selectedTeam = ''
    this.selectedGame = ''
    this.selectedDay = day.date
    let games = this.weekGames.find((date: any) => date.date === day.date);
    this.dayPassed = day.passed
    this.dayGames = games.games
  }

  pickGame(game: any){
    if (game._id !== this.selectedGame) {
      this.gameTeams = []
      this.selectedTeam = ''
      this.selectedGame = ''
      this.teamPlayers = []
      this.selectedGame = game._id;
      this.team.getTeamDetails(game.h_team._id).subscribe({
        next: response => { this.h_team = response.data },
        error: err => { }
      });
      this.team.getTeamDetails(game.v_team._id).subscribe({
        next: response => { this.v_team = response.data },
        error: err => { }
      });
      this.gameTeams.push({'name': game.h_team.name, 'type': 'h_team', '_id': game.h_team._id});
      this.gameTeams.push({'name': game.v_team.name, 'type': 'v_team', '_id': game.v_team._id});
    }
  }

  pickTeam(team: any){
    console.log(this.gameTeams)
    console.log('PickTeam', this.selectedTeam, team);
    this.teamPlayers = []
    this.selectedTeam = team._id;
    let displayTeam = team.type === 'h_team' ? this.h_team : this.v_team;
    // Prepare players
    displayTeam.players.forEach((player: any) => {
      let p_blacklisted = this.blacklist.find((p: any) => p.player_id === player._id)
      if (p_blacklisted){ this.teamPlayers.push({'name': player.name, '_id': player._id, 'blacklist': true, 'days': p_blacklisted.days});
      } else { this.teamPlayers.push({'name': player.name, '_id': player._id, 'blacklist': false})}
    });
  }

  pickPlayer(player: any){
    if (!this.dayPassed && !player.blacklist && this.selectedDay) {
      this.player.pickPlayer(player._id, this.selectedDay).subscribe({
        next: response => { this.postPickPlayer(response) },
        error: err => { console.log(err) }
      });
    }
  }

  postPickPlayer(response: any){
    console.log(response)
    this.storage.setItem('blacklist', JSON.stringify(response.data.blacklist));
    this.storage.setItem('deck', JSON.stringify(response.data.deck));
    this.initiateBlacklist(response.data.blacklist)
    console.log(this.blacklist);
    let team = this.gameTeams.find((t: any) => t._id === this.selectedTeam)
    this.pickTeam(team);
  }
}
