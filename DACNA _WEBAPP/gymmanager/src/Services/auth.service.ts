import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fauth: Auth = inject(Auth);

  constructor() {}

  async CreateAccount(username: string, password: string) {
    return await createUserWithEmailAndPassword(this.fauth, username, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        return user;
      })
      .catch((error) => {
        console.error('Error creating account:', error);
        throw error;
      });
  }

  async login(username: string, password: string) {
    return await signInWithEmailAndPassword(this.fauth, username, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        return user;
      })
      .catch((error) => {
        console.error('Login error:', error);
        throw error;
      });
  }

  async signinGmail() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.fauth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        return user;
      })
      .catch((error) => {
        console.error('Google login error:', error);
        throw error;
      });
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      if (this.fauth.currentUser) {
        this.fauth.signOut().then(() => resolve('Logged out'));
      } else {
        reject();
      }
    });
  }
}