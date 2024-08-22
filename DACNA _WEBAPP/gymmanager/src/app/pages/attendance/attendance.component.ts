import { Component } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { Customers } from '../../Models/Customers';
import { CustomerService } from '../../../Services/customer.service';
import { AttendanceService } from '../../../Services/attendance.service';
import { Attendance } from '../../Models/Attendance';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
  phoneNumber: string = '';
  customer: Customers | null = null;
  message: string = '';

  constructor(
    private customerService: CustomerService,
    private attendanceService: AttendanceService
  ) {}

  getCustomerDetails(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customer = customers.find((c) => c.PhoneNumber === this.phoneNumber) || null;
      if (!this.customer) {
        this.message = 'Customer not found';
      } else {
        this.message = '';
      }
    });
  }

  checkInCustomer(): void {
    if (this.customer) {
      const attendanceData: Attendance = {
        BillID: Number(this.customer.CustomerID), // Chuyển đổi sang số
        CheckInTime: new Date(),

      };


      this.attendanceService.createAttendance(attendanceData).subscribe(
        () => {
          this.message = 'Check-in successful';
        },
        (error) => {
          this.message = 'Check-in failed: ' + error.message;
        }
      );
    }
  }
}