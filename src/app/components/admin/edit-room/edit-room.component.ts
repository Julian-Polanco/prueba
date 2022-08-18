import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { ResponseServiceSingle } from 'src/app/models/response-service';
import { Room } from 'src/app/models/room';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  codeRoomParam: string = "";

  formDetailRoom: FormGroup;

  constructor(private httpClient: HttpClientService, private activatedRoute: ActivatedRoute,
    private spinnerService: SpinnerService, private snackBar: SnackBarService,
    private router: Router) {
    this.codeRoomParam = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.formDetailRoom = new FormGroup({
      name: new FormControl('', [Validators.required]),
      descriptionShort: new FormControl('', [Validators.required]),
      descriptionLarge: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    var spinnerRef = this.spinnerService.start("Cargando detalle de habitación...");
    const map = new Map();
    map.set("roomCode", this.codeRoomParam);
    this.httpClient.get<ResponseServiceSingle<Room>>(ENDPOINTS.getRoomDetail, map).subscribe((result: ResponseServiceSingle<Room>) => {
      if (result.status == 200) {
        this.formDetailRoom.controls.name.setValue(result.data.name);
        this.formDetailRoom.controls.descriptionLarge.setValue(result.data.descriptionLarge);
        this.formDetailRoom.controls.descriptionShort.setValue(result.data.descriptionShort);
        this.formDetailRoom.controls.price.setValue(result.data.price);
      }
      this.spinnerService.stop(spinnerRef);
    });
  }

  editRoom(): void {
    var spinnerRef = this.spinnerService.start("Cargando detalle de habitación...");
    const map = new Map();
    map.set("roomCode", this.codeRoomParam);
    const room = {
      name: this.formDetailRoom.controls.name.value,
      descriptionShort: this.formDetailRoom.controls.descriptionShort.value,
      descriptionLarge: this.formDetailRoom.controls.descriptionLarge.value,
      price: this.formDetailRoom.controls.price.value
    }
    this.httpClient.post(ENDPOINTS.updateRoom, room, map).subscribe((result: any) => {
      if (result.status == 200) {
        this.snackBar.openSnackBar("Habitación actualizada con éxito!");
        this.router.navigate(['/rooms/room', this.codeRoomParam]);
      }
      this.spinnerService.stop(spinnerRef);
    });
  }

}