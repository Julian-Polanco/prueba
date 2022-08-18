import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-edit-guest',
  templateUrl: './edit-guest.component.html',
  styleUrls: ['./edit-guest.component.css']
})
export class EditGuestComponent implements OnInit {

  formUser: FormGroup;
  closeModal: boolean = false;

  constructor(private httpClient: HttpClientService, private spinner: SpinnerService,
    private snack: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formUser = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z- ]{1,63}$',),]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',),]),
    })
  }

  ngOnInit(): void {
    const spinner = this.spinner.start("Cargando usuario...");
    const map = new Map();
    map.set("userId", this.data.userId);
    this.httpClient.get(ENDPOINTS.getUser, map).subscribe((result: any) => {
      if (result.status == 200) {
        this.formUser.controls.fullname.setValue(result.data.fullname);
        this.formUser.controls.email.setValue(result.data.email);
      }
      this.spinner.stop(spinner);
    });
  }

  editUser(): void {
    const spinner = this.spinner.start("Actualizando usuario...");
    const user = {
      id: this.data.userId,
      fullname: this.formUser.controls.fullname.value,
      email: this.formUser.controls.email.value
    }
    this.httpClient.post(ENDPOINTS.updateUser, user).subscribe((result: any) => {
      if(result.status == 200) {
        this.snack.openSnackBar("Actualizado con éxito!");
      }
      this.closeModal = true;
      this.spinner.stop(spinner);
    });
  }

}
