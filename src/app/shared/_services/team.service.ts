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
export class TeamService {

  url = environment.backEndURL + '/team'

  constructor(private http: HttpClient) { }

  getTeamDetails(teamId: string): Observable<any>{
    return this.http.get(this.url + '/' + teamId)
  }
}
