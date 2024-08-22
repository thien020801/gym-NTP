import { DecimalPipe } from "@angular/common";

export interface SessionPackage {
    SessionSubscriptionID: number;
    Name?: string;
    Cost?: DecimalPipe;
    NumberOfSessions?: string;
  }
  