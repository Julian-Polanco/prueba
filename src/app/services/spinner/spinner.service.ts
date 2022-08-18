import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerViewComponent } from 'src/app/components/shared/spinner-view/spinner-view.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {


  constructor(private dialog: MatDialog) {
  }

  start(message?: string): MatDialogRef<SpinnerViewComponent> {

    const dialogRef = this.dialog.open(SpinnerViewComponent, {
      disableClose: true,
      data: message == '' || message == undefined ? "Cargando..." : message
    });
    return dialogRef;
  };

  stop(ref: MatDialogRef<SpinnerViewComponent>) {
    ref.close();
  }
}  