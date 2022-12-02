import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "../shared/_services/auth.service";
import { TokenStorageService } from "../shared/_services/token-storage.service";
import { StorageService } from "../shared/_services/storage.service";
import { UserService } from "../shared/_services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordInputType = 'password';
  passwordMessage: string | undefined;
  emailMessage: string | undefined;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private auth: AuthService, private token: TokenStorageService,
              private router: Router, private storage: StorageService, private user: UserService) {
    this.loginForm = this.fb.group({
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if(this.token.getToken()){ this.router.navigate(['/home']).then(r => {}); }
  }

  submit(): void {
    this.emailMessage = undefined;
    this.passwordMessage = undefined;
    this.errorMessage = undefined;
    if(this.loginForm.status === "VALID"){
      this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        response => {
          this.token.saveToken(response.data.token);
          this.storage.setItem('user', JSON.stringify(response.data.user));
          this.user.getBlacklistObservable().subscribe(
            response => { console.log(response); this.storage.setItem('blacklist', JSON.stringify(response.data)); },
            error => { console.log(error)}
          );
          this.user.getDeckObservable().subscribe(
            response =>{ console.log(response); this.storage.setItem('deck', JSON.stringify(response.data)); },
            error => {console.log(error)}
          );
          this.router.navigate(['']).then(r => {});
        },
        err => {
          if(err.status === 401){ this.errorMessage = 'Email ou mot de passe incorrect'; }
          if(err.status === 500){ this.errorMessage = 'Erreur serveur veuillez contacter votre administrateur'; }
        }
      );
    } else {
      if(this.loginForm.controls['email'].status === "INVALID"){
        this.emailMessage = 'Email vide ou invalide';
      }
      if(this.loginForm.controls['password'].status === "INVALID"){
        this.passwordMessage = 'Mot de passe vide ou invalide';
      }
    }

  }

  register(): void{
    this.router.navigate(['register']).then(r => {});
  }
}
