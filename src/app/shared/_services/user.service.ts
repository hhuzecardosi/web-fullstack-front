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
export class UserService {

  url = environment.backEndURL + '/user'

  constructor(private http: HttpClient) { }

  getProfilePromise(id: string): Promise<any> {
    return this.http.get(this.url + '/' + id).toPromise()
  }

  getBlacklistPromise(): Promise<any> {
    return this.http.get(this.url + '/blacklist').toPromise()
  }

  getDeckPromise(): Promise<any> {
    return this.http.get(this.url + '/deck').toPromise()
  }

  getHistoryPromise(): Promise<any> {
    return this.http.get(this.url + '/history').toPromise()
  }

  updatePasswordPromise(id: string, newPassword: string, oldPassword: string): Promise<any> {
    return this.http.put(this.url + '/password/' + id, {password: oldPassword, new_password: newPassword}).toPromise()
  }

  updatePseudoPromise(id: string, pseudo: string): Promise<any> {
    return this.http.put(this.url + '/password/' + id, {pseudo: pseudo}).toPromise()
  }

  getProfileObservable(id: string): Observable<any> {
    return this.http.get(this.url + '/' + id)
  }

  getBlacklistObservable(): Observable<any> {
    return this.http.get(this.url + '/blacklist')
  }

  getDeckObservable(): Observable<any> {
    return this.http.get(this.url + '/deck')
  }

  getHistoryObservable(): Observable<any> {
    return this.http.get(this.url + '/history')
  }

  updatePasswordObservable(id: string, newPassword: string, oldPassword: string): Observable<any> {
    return this.http.put(this.url + '/password/' + id, {password: oldPassword, new_password: newPassword})
  }

  updatePseudo(id: string, pseudo: string): Observable<any> {
    return this.http.put(this.url + '/password/' + id, {pseudo: pseudo})
  }

}
