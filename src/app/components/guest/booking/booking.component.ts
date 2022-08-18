import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { HttpClientService } from 'src/app/services/http-client/http-client.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  roomCode: string = "";
  userId: number;

  constructor(private httpClient: HttpClientService, private activatedRouter: ActivatedRoute) {
    this.activatedRouter.queryParams.subscribe((data: any) => {
      this.userId = JSON.parse(data.data).userId;
      this.roomCode = JSON.parse(data.data).roomCode;
    });
  }

  ngOnInit(): void {
  }


}
