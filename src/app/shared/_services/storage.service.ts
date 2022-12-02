import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, item: any){
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, item);
  }

  getItem(key: string){
    return window.localStorage.getItem(key)
  }
}
