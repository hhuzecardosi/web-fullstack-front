import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { TokenStorageService } from "../_services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private token: TokenStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUrl = state.url;

    let isAuth = this.token.getToken();
    if (!isAuth) {
      if(currentUrl.includes('login')){ return true; }
      if(currentUrl.includes('register')){ return true;}
      if(currentUrl.includes('night-results')){ return true; }
      this.router.navigate(['/login']).then()
    } else {
      if (currentUrl.includes('login') || currentUrl.includes('register')){
        this.router.navigate(['']).then();
        return false;
      }
    }

    return true;
  }
}
