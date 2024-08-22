import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { Auth } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
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
  Logout() {
    this.fauthService.logout();
    location.href = '/signIn';
  }
}
