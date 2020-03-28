import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app';

@Injectable()

export class AuthenticationService { 
  user
  userDetails : firebase.User = null 
  displayName : string = ""

  constructor(private afAuth : AngularFireAuth, private router : Router) { 
    this.user = afAuth.authState
    this.user.subscribe((user) => { 
      if (user) {
        this.userDetails = user
        this.displayName = (this.userDetails.displayName) ? this.userDetails.displayName : this.userDetails.email
        this.router.navigate(['/']) 
      } 
      else this.userDetails = null
    }) 
  }

  signInRegular(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  signInGoogle() {
    const provider = new auth.GoogleAuthProvider()
    this.afAuth.auth.signInWithPopup(provider)
  }

  loginRegular(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password) 
  }

  isLoggedIn() : boolean {
    return this.userDetails != null
  }

  logout() {
    this.afAuth.auth.signOut().then((res) => this.router.navigate([""]))
  } 
}