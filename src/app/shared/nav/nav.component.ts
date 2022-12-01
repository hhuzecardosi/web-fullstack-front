import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../_services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private token: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
  }

  navigate(destination: string): void{
    this.router.navigate(['/' + destination]).then(r => {})
  }

  signOut() {
    this.token.signOut();
    window.location.reload();
  }
}
