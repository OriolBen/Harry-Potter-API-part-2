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
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  loginRegular(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password) 
  }

  isLoggedIn() : boolean {
    return this.userDetails != null
  }

  logout() {
    return this.afAuth.auth.signOut().then((res) => this.router.navigate([""]))
  }

  resetPasswordEmail(email: string) { 
    return this.afAuth.auth.sendPasswordResetEmail(email).then(() => alert('A password reset link has been sent to your email address'), (rejectionReason) => alert(rejectionReason)).catch(e => alert('An error occurred while attempting to reset your password')).then((res) => this.router.navigate([""]))
  }

  checkOobCode(oobCode : string) {
    return this.afAuth.auth.verifyPasswordResetCode(oobCode).catch(e => {
      alert(e)
      this.router.navigate([""])
    })
  }

  resetPassword(oobCode : string, password : string) {
    return this.afAuth.auth.confirmPasswordReset(oobCode, password).then(resp => {
      alert('New password has been saved')
      this.router.navigate(["/login"])
    }).catch(e => alert(e))
  }
}