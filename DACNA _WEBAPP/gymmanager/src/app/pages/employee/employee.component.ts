import { Component } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Employees } from '../../Models/Employees';
import { EmployeeService } from '../../../Services/employee.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterLink,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  employeesList!: Employees[];

  config: any = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0,
  };

  constructor(private service: EmployeeService) {}

  pageChanged(event: any): void {
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.service.getEmployees().subscribe((employees) => {
      this.employeesList = employees;
    });
  }

  confirmDelete(id: any): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.deleteEmployees(id);
    }
  }

  deleteEmployees(id: any): void {
    this.service.deleteEmployee(id).subscribe(
      () => {
        console.log('Customer deleted successfully');
        this.loadEmployees();
      },
      (error) => {
        console.error('Error deleting customer:', error);
      }
    );
  }

  selectedEmployee: Employees | null = null;
  showEditForm = false;

  // editEmployee(employee: Employees): void {
  //   this.selectedEmployee = { ...employee }; // Make a copy to avoid directly mutating the original data
  //   this.showEditForm = true;
  // }

  // // saveChanges(): void {
  // //   if (this.selectedEmployee) {
  // //     this.service.updateEmployee(this.selectedEmployee.EmployeeID, this.selectedEmployee).subscribe(
  // //       () => {
  // //         console.log('Employee updated successfully');
  // //         this.showEditForm = false; // Hide the edit form after successful update
  // //         // Optionally, you can reload the employee list here:
  // //         this.loadEmployees();
  // //       },
  // //       error => {
  // //         console.error('Error updating employee:', error);
  // //       }
  // //     );
  // //   }
  // // }

  // // cancelEdit(): void {
  // //   this.showEditForm = false;
  // //   this.selectedEmployee = null;
  // // }
}
