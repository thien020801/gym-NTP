import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SessionPackage } from '../../Models/SessionPackage';
import { SessionPackageService } from '../../../Services/session-package.service';

@Component({
  selector: 'app-session-package',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule, HttpClientModule, NgxPaginationModule, FormsModule],
  templateUrl: './session-package.component.html',
  styleUrls: ['./session-package.component.css']
})
export class SessionPackageComponent implements OnInit {
  sessionPackageList!: SessionPackage[];

  addingNew: boolean = false;
  newSubscription: Partial<SessionPackage> = {};

  editingIndex: number | null = null;
  editedSubscription: Partial<SessionPackage> = {};

  config: any = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0,
  };

  constructor(private service: SessionPackageService) {}

  pageChanged(event: any): void {
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.loadSessionPackage();
  }

  loadSessionPackage(): void {
    this.service.getSessionPackage().subscribe((sessionPackage) => {
      this.sessionPackageList = sessionPackage;
    });
  }

  confirmDelete(id: any): void {
    if (confirm('Are you sure you want to delete this package?')) {
      this.deleteSessionPackage(id);
    }
  }

  deleteSessionPackage(id: any): void {
    this.service.deleteSessionPackage(id).subscribe(
      () => {
        console.log('Package deleted successfully');
        this.loadSessionPackage();
      },
      error => {
        console.error('Error deleting package:', error);
      }
    );
  }

  startAdd(): void {
    this.addingNew = true;
    this.newSubscription = {};
  }

  saveNewSubscription(): void {
    if (this.newSubscription.Name && this.newSubscription.Cost && this.newSubscription.NumberOfSessions) {
      this.service.createSessionPackage(this.newSubscription).subscribe(
        () => {
          console.log('New subscription added successfully');
          this.addingNew = false;
          this.loadSessionPackage();
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
    this.editedSubscription = { ...this.sessionPackageList[index] };
  }

  saveEditedSubscription(): void {
    if (this.editedSubscription.SessionSubscriptionID && this.editedSubscription.Name && this.editedSubscription.Cost && this.editedSubscription.NumberOfSessions) {
      this.service.updateSessionPackage(this.editedSubscription as SessionPackage).subscribe(
        () => {
          console.log('Subscription updated successfully');
          this.editingIndex = null;
          this.loadSessionPackage();
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
