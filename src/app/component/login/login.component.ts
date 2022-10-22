import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../../service/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFormGroup!: FormGroup;
  errorMessage:any;
  constructor(private formBuilder: FormBuilder,
            private authentificationService: AuthentificationService,
            private router:Router) {
  }

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      username: this.formBuilder.control(""),
      password: this.formBuilder.control(""),
    })
  }

  handleAuthentification() {
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.authentificationService.login(username, password).subscribe({
      next: (data) => {
        this.authentificationService.isAuthenticatedUser(data).subscribe({
          next: (data) => {
            this.router.navigateByUrl("admin");
          }
        })
      },
      error: (err) => {
        this.errorMessage=err;
      }
    })
  }
}
