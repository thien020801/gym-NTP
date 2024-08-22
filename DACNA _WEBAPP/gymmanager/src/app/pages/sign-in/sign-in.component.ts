import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SigninService } from '../../../Services/signin.service';  // Điều chỉnh đường dẫn nếu cần
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  fauthService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);

  constructor(
    private signinService: SigninService,
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const { phoneNumber, password } = this.signInForm.value;
      console.log('Form Submitted!', this.signInForm.value);

      this.signinService.signIn(phoneNumber, password).subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error('Login failed:', error);
          alert('Invalid phone number or password');
        }
      );
    }
  }

  tryGoogleLogin() {
    this.fauthService.signinGmail().then(
      (user) => {
        console.log(user);
        this.router.navigate(['./home']);
      },
      (err) => {
        console.error(err);
        alert('Google login failed');
      }
    );
  }
}
