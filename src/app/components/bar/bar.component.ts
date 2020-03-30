import { Component } from '@angular/core'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})

export class BarComponent {
  message : string = ""
  show : boolean = false

  constructor(private authService : AuthenticationService) {
    setTimeout(() => {
      if (authService.isLoggedIn()) {
        this.message = "Welcome back, " + authService.userDetails.email
        this.show = true
      }
    }, 2500)
  }
}