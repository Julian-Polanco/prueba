import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomComponent } from './add-room/add-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { GuestsComponent } from './guests/guests.component';

const routes: Routes = [
  {
    path: 'add-room',
    component: AddRoomComponent,
  },
  {
    path: 'manage-room/:id',
    component: EditRoomComponent,
  },
  {
    path: 'manage-guests',
    component: GuestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
