import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new  HttpHeaders({'Content-Type': 'application-json'})
}
@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  url = environment.backEndURL + '/player'

  constructor(private http: HttpClient) { }

  getNightStats(): Observable<any>{
    return this.http.get(this.url + '/statistics/yesterday');
  }

  pickPlayer(playerID: string, date: string): Observable<any>{
    return this.http.get(this.url + '/pick/' + date + '/' + playerID);
  }
}
