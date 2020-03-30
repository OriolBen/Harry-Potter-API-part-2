import { Component } from '@angular/core'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})

export class BarComponent {
  email : string = ""

  constructor(private authService : AuthenticationService) {
    setTimeout(() => { this.email = authService.userDetails.email }, 2500)
  }
}