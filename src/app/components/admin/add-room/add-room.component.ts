import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { Room } from 'src/app/models/room';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  public codeRoom: string = "";
  childImages: boolean = false;

  roomForm: FormGroup;

  constructor(private spinnerService: SpinnerService, private snackBarService: SnackBarService, private httpClient: HttpClientService) {
    this.roomForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      descriptionShort: new FormControl('', [Validators.required]),
      descriptionLarge: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required, this.noWhitespaceValidator, Validators.maxLength(30)])
    });
  }

  ngOnInit(): void {
  }

  noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? { 'whitespace': true } : null;
  }

  isSelectedImages(value: boolean) {
    this.childImages = value;
  }

  addRoom(): void {
    var spinnerRef = this.spinnerService.start("Agregando habitación...");
    if (!this.roomForm.valid || !this.childImages) {
      return
    }
    const room: Room = {
      name: this.roomForm.controls.name.value,
      descriptionShort: this.roomForm.controls.descriptionShort.value,
      descriptionLarge: this.roomForm.controls.descriptionLarge.value,
      price: Number(this.roomForm.controls.price.value),
      code: this.roomForm.controls.code.value,
      image: ""
    }
    this.httpClient.post(ENDPOINTS.addRoom, room).subscribe((result: any) => {
      this.spinnerService.stop(spinnerRef);
      if (result.status == 200) {
        // servicio para agregar imágenes result.data tiene el código de habitación
        this.snackBarService.openSnackBar("Habitación agregada existosamente!");
        this.codeRoom = result.data;
      } else {
        this.snackBarService.openSnackBar("Ocurrió un error");
      }
    });
  }

}
