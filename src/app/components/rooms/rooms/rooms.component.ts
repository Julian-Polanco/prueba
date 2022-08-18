import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { ResponseService } from 'src/app/models/response-service';
import { Room } from 'src/app/models/room';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  bookForm: FormGroup;

  listRoom: Room[] = [];

  minDate = new Date();

  constructor(private httpClient: HttpClientService, private spinnerService: SpinnerService,
    private datePipe: DatePipe) {
    this.bookForm = new FormGroup({
      dateStart: new FormControl('', [Validators.required]),
      dateEnd: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    var spinnerRef = this.spinnerService.start("Cargando listado de habitaciones...");
    this.httpClient.get<ResponseService<Room>>(ENDPOINTS.getAllRooms).subscribe((result: ResponseService<Room>) => {
      if (result.status == 200) {
        this.listRoom = result.data;
      }
      this.spinnerService.stop(spinnerRef);
    });
  }

  public searchRooms(): void {
    const startDate = this.datePipe.transform(this.bookForm.controls.dateStart.value, 'yyyy-MM-dd');
    const endDate = this.datePipe.transform(this.bookForm.controls.dateEnd.value, 'yyyy-MM-dd');
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('startDate', String(startDate));
    headers = headers.set('endDate', String(endDate));
    var spinnerRef = this.spinnerService.start("Cargando listado de habitaciones...");
    this.httpClient.get<ResponseService<Room>>(ENDPOINTS.getAllRoomsBetween, undefined, { headers }).subscribe((result: ResponseService<Room>) => {
      if (result.status == 200) {
        this.listRoom = result.data;
      }
      this.spinnerService.stop(spinnerRef);
    });
  }

  public searchRoomsIsValid(): boolean {
    return this.bookForm.invalid;
  }

}
