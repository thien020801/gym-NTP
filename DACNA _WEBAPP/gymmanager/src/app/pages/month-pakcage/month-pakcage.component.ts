import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MonthPackage } from '../../Models/MonthPackage';
import { MonthPackageService } from '../../../Services/month-package.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-month-pakcage',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule, HttpClientModule, NgxPaginationModule, FormsModule],
  templateUrl: './month-pakcage.component.html',
  styleUrls: ['./month-pakcage.component.css']
})
export class MonthPakcageComponent implements OnInit {
  monthPackageList!: MonthPackage[];
  addingNew: boolean = false;
  newSubscription: Partial<MonthPackage> = {};
  editingIndex: number | null = null;
  editedSubscription: Partial<MonthPackage> = {};

  config: any = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0,
  };

  constructor(private service: MonthPackageService) {}

  pageChanged(event: any): void {
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.loadMonthPackage();
  }

  loadMonthPackage(): void {
    this.service.getMonthPackage().subscribe((monthpackage) => {
      this.monthPackageList = monthpackage;
    });
  }

  confirmDelete(id: any): void {
    if (confirm('Are you sure you want to delete this package?')) {
      this.deleteMonthPackage(id);
    }
  }

  deleteMonthPackage(id: any): void {
    this.service.deleteMonthPackage(id).subscribe(
      () => {
        console.log('Customer deleted successfully');
        this.loadMonthPackage();
      },
      error => {
        console.error('Error deleting customer:', error);
      }
    );
  }

  startAdd(): void {
    this.addingNew = true;
    this.newSubscription = {};
  }

  saveNewSubscription(): void {
    if (this.newSubscription.Name && this.newSubscription.Cost && this.newSubscription.Duration) {
      this.service.createMonthPackage(this.newSubscription).subscribe(
        () => {
          console.log('New subscription added successfully');
          this.addingNew = false;
          this.loadMonthPackage();
        },
        error => {
          console.error('Error adding subscription:', error);
        }
      );
    } else {
      alert('Please fill out all fields');
    }
  }

  cancelAdd(): void {
    this.addingNew = false;
  }

  startEdit(index: number): void {
    this.editingIndex = index;
    this.editedSubscription = { ...this.monthPackageList[index] };
  }

  saveEditedSubscription(): void {
    if (this.editedSubscription.MonthlySubscriptionID && this.editedSubscription.Name && this.editedSubscription.Cost && this.editedSubscription.Duration) {
      this.service.updateMonthPackage(this.editedSubscription as MonthPackage).subscribe(
        () => {
          console.log('Subscription updated successfully');
          this.editingIndex = null;
          this.loadMonthPackage();
        },
        error => {
          console.error('Error updating subscription:', error);
        }
      );
    } else {
      alert('Please fill out all fields');
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
  }
}
