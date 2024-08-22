import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { Customers } from '../../Models/Customers';
import { CustomerService } from '../../../Services/customer.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule, HttpClientModule, NgxPaginationModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})

export class CustomersComponent implements OnInit {
  customersList!: Customers[];

  config: any = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0,
  };

  constructor(private service: CustomerService) {}

  pageChanged(event: any): void {
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.service.getCustomers().subscribe((customers) => {
      this.customersList = customers;
    });
  }

  confirmDelete(id: any): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.deleteCustomer(id);
    }
  }

  deleteCustomer(id: any): void {
    this.service.deleteCustomer(id).subscribe(
      () => {
        console.log('Customer deleted successfully');
        this.loadCustomers();
      },
      error => {
        console.error('Error deleting customer:', error);
      }
    );
  }
}
