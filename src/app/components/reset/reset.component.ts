import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})

export class ResetComponent implements OnInit {
  email : string = ""
  password : string = ""
  mode : string = ""
  oobCode : string = ""

  constructor(private authService : AuthenticationService, private route : ActivatedRoute, private router : Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode']
      this.oobCode = params['oobCode']
    })
    if (this.mode === undefined) this.mode = "normal"
    else if (this.mode == "resetPassword") this.authService.checkOobCode(this.oobCode)
    else {
      alert("URL is not valid")
      this.router.navigate([""])
    }
  }
}