import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoomComponent } from './add-room/add-room.component';
import { AdminRoutingModule } from './admin-routing.module';
import { GuestsComponent } from './guests/guests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { FileUploadServiceService } from 'src/app/services/file-upload-service.service';
import { MatTableModule } from '@angular/material/table';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { EditGuestComponent } from './edit-guest/edit-guest.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AddRoomComponent,
    GuestsComponent,
    EditRoomComponent,
    EditGuestComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    // Angular material
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  bootstrap: [GuestsComponent]
})
export class AdminModule { }
