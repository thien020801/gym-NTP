import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../Services/user.service';
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  fauth: Auth = inject(Auth);
  fauthService: AuthService = inject(AuthService);
  displayName: any;
  userService: UserService = inject(UserService);
  constructor() {
    this.userService.getCurrentUser().then((user) => {
      this.displayName =
        user.displayName != null ? user.displayName : user.email;
      console.log('display Name:', this.displayName);
    });
  }
  // Logout() {
  //   this.fauthService.logout();
  //   location.href = '/login';
  // }
}
 