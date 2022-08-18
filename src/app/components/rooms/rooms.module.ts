import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatCarouselModule } from 'ng-mat-carousel';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomToListComponent } from './room-to-list/room-to-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    RoomsComponent,
    RoomToListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RoomsRoutingModule,
    //Material carousel
    MatCarouselModule.forRoot(),
    //Angular Material
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule
  ],
  exports: [
    RoomsComponent
  ],
  providers: [
    DatePipe
  ]
})
export class RoomsModule { }
