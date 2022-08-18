import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking/booking.component';
import { HistoricalComponent } from './historical/historical.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GuestRoutingModule } from './guest-routing.module';
import { MatNativeDateModule, } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    BookingComponent,
    HistoricalComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GuestRoutingModule,
    // Angular material
    MatButtonModule

  ]
})
export class GuestModule { }
