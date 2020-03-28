import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent  {
  email : string = ""
  password : string = ""

  constructor(private authService : AuthenticationService, private router : Router) {}

  register() {
    this.authService.signInRegular(this.email, this.password).then((res) => this.router.navigate(["/"])).catch((err) => { 
      alert("Error: " + err)
      this.password = ""
    }) 
  }
}