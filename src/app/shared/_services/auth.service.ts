import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from "../../../environments/environment";

const httpOptions = {
  headers: new  HttpHeaders({'Content-Type': 'application-json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any>{
    return this.http.post<any>(environment.backEndURL + '/signin', {email: email, password: password});
  }

  register(email: string, pseudo: string, password: string): Observable<any>{
    return this.http.post<any>(environment.backEndURL + '/register', {email: email, pseudo: pseudo, password: password});
  }
}
