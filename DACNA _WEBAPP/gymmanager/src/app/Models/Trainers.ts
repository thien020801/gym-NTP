import { DecimalPipe } from "@angular/common";

export interface Trainers {
    TrainerID?: string;
    TrainerName?: string;
    Image?: string;
    PhoneNumber?: string;
    Password?: string;
    Address?: string;
    DateOfBirth?: Date;
    Email?: string;
    Gender?: string;
    Salary?: DecimalPipe;
    Cost?: DecimalPipe;
  }
  