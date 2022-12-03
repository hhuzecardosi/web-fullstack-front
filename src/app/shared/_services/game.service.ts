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
export class GameService {

  url = environment.backEndURL + '/game'


  constructor(private http: HttpClient) { }

  getWeekGames(): Observable<any>{
    return this.http.get(this.url + '/week')
  }
}
