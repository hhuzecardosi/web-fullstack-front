import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../shared/_services/auth.service";
import {TokenStorageService} from "../shared/_services/token-storage.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  passwordInputType = 'password';
  passwordMessage: string | undefined;
  emailMessage: string | undefined;
  pseudoMessage: string | undefined;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private auth: AuthService, private token: TokenStorageService, private router: Router) {
    this.registerForm = this.fb.group({
      email: [undefined, [Validators.required, Validators.email]],
      pseudo: [undefined, [Validators.required, Validators.minLength(3)]],
      password: [undefined, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [undefined, [Validators.required, Validators.minLength(8)]]

    }, {validators: this.passwordMatchValidator})
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(g: FormGroup) {
    return g.controls['password'].value === g.controls['confirmPassword'].value ? null : {'password': true};
  }

  submit() {
    this.emailMessage = undefined;
    this.passwordMessage = undefined;
    this.errorMessage = undefined;
    this.pseudoMessage = undefined;
    if(this.registerForm.status === 'VALID'){
      this.auth.register(this.registerForm.value.email, this.registerForm.value.pseudo, this.registerForm.value.password).subscribe(
        response => {
          this.auth.login(this.registerForm.value.email, this.registerForm.value.password).subscribe(
            response => {
              this.token.saveToken(response.data.token);
              this.router.navigate(['']).then(r => {});
            },
            err => {
              if(err.status === 401){ this.errorMessage = 'Email ou mot de passe incorrect'; }
              if(err.status === 500){ this.errorMessage = 'Erreur serveur veuillez contacter votre administrateur'; }
            }
          );
        },
        error => {
         console.log('error', error.error)
          if(error.error.error === "EMAIL_ALREADY_USED"){ this.emailMessage = 'Email déjà utilisé, voulez vous vous connecter ?'}
          if(error.error.error === "PSEUDO_ALREADY_USED"){ this.pseudoMessage = 'Pseudo déjà utilisé'}
          if(error.error.code === 500){ this.errorMessage = 'Erreur serveur veuillez réessayer plus tard ou contacter le support'}
        });
    }else{
      if(this.registerForm?.errors){
        const errors = this.registerForm?.errors
        if(errors['password']){ this.passwordMessage = 'Les mots de passe ne correspondent pas'}
      }
      if(this.registerForm.controls['email'].status === "INVALID"){
        this.emailMessage = 'Email vide ou invalide';
      }
      if(this.registerForm.controls['password'].status === "INVALID"){
        this.passwordMessage = 'Mot de passe vide ou invalide';
      }
      if(this.registerForm.controls['pseudo'].status === "INVALID"){
        this.passwordMessage = 'Pseudo vide ou invalide';
      }
    }
  }

  login() {
    this.router.navigate(['login']).then(r => {});
  }
}
