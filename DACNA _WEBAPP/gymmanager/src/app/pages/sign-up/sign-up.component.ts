import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { SignupService } from '../../../Services/signup.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';

// Custom validator function
function dateOfBirthValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  // Lấy ngày hiện tại
  const today = new Date();
  // Lấy ngày sinh từ form
  const dob = new Date(control.value);
  // Tính tuổi bằng cách trừ ngày sinh từ ngày hiện tại
  const age = today.getFullYear() - dob.getFullYear();
  // Kiểm tra tuổi
  if (age < 18) {
    return { invalidAge: { value: control.value } };
  }
  return null;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    SidebarComponent,
    TopbarComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  signUpService: SignupService = inject(SignupService);
  successMessage: string | null = null; // Biến để hiển thị thông báo thành công

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      EmName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
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
      Email: ['', [Validators.required, Validators.email]],
      Address: ['', [Validators.required, Validators.minLength(6)]],
      DateOfBirth: ['', [Validators.required, dateOfBirthValidator]],
      Gender: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const formData = this.signUpForm.getRawValue();
    console.log('Form Data:', formData); // Kiểm tra dữ liệu trước khi gửi
    this.signUpService.signUp(formData).subscribe(
      (response) => {
        console.log('Đăng ký thành công!', response);
        this.successMessage = 'Customer created successfully'; // Hiển thị thông báo
        this.signUpForm.reset(); // Làm trống các ô nhập liệu
      },
      (error) => {
        console.error('Đăng ký thất bại!', error);
      }
    );
  }
}
