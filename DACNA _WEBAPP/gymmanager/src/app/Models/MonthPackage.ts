import { DecimalPipe } from "@angular/common";

export interface MonthPackage {
    MonthlySubscriptionID: number;
    Name?: string;
    Cost?: DecimalPipe;
    Duration?: string;
  }
  