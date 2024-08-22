import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { Trainers } from '../../Models/Trainers';
import { PtService } from '../../../Services/pt.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-pt',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent, CommonModule, HttpClientModule, NgxPaginationModule],
  templateUrl: './pt.component.html',
  styleUrl: './pt.component.css',
})
export class PTComponent implements OnInit  {
  trainersList!: Trainers[];

  config: any = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0,
  };

  constructor(private service: PtService) {}

  pageChanged(event: any): void {
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.loadTrainers();
  }

  loadTrainers(): void {
    this.service.getTrainers().subscribe((trainers) => {
      this.trainersList = trainers;
    });
  }

  confirmDelete(id: any): void {
    if (confirm('Are you sure you want to delete this PT?')) {
      this.deleteTrainers(id);
    }
  }

  deleteTrainers(id: any): void {
    this.service.deleteTrainers(id).subscribe(
      () => {
        console.log('Customer deleted successfully');
        this.loadTrainers();
      },
      (error) => {
        console.error('Error deleting customer:', error);
      }
    );
  }
}
