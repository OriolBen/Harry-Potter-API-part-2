import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email : string = ""
  password : string = ""

  constructor(private authService : AuthenticationService, private router : Router) {}

  login() {
    this.authService.loginRegular(this.email, this.password).then((res) => this.router.navigate(['/'])).catch((err) => alert(err))
  }
}