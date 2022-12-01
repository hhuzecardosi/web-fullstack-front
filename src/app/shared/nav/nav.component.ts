import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../_services/token-storage.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
  }

  navigate(destination: string): void{
    console.log(destination)
  }

  signOut() {
    this.token.signOut();
    window.location.reload();
  }
}
