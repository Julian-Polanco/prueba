import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private durationInSeconds: number = 8;

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  private matSnackBarConfig: MatSnackBarConfig = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: this.durationInSeconds * 1000,
  };

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(text: string) {
    this._snackBar.open(text, 'Ok', this.matSnackBarConfig);
  }

}
