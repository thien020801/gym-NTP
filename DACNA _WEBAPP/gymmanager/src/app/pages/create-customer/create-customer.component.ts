import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { CustomerService } from '../../../Services/customer.service';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    SidebarComponent,
    TopbarComponent,
  ],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css',
})
export class CreateCustomerComponent {
  signUpForm: FormGroup;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.signUpForm = this.fb.group({
      CusName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
      PhoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?:\+84|0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-6|8|9]|9[0-4|6-9])\d{7}$/
          ),
        ],
      ],
      // Email: ['', [Validators.required, Validators.email]],
      Address: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('Password');
    const confirmPassword = form.get('ConfirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.customerService.signUp(this.signUpForm.value).subscribe(
        (response) => {
          this.successMessage = 'Customer created successfully';
          this.signUpForm.reset();
        },
        (error) => {
          console.error('Error creating customer:', error);
        }
      );
    }
  }
}
