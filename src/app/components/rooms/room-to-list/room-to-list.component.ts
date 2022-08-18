import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface Tile {
  button?: string;
  txtButton?: string;
  cols: number;
  rows: number;
  title?: string;
  description?: string;
  image?: string;
}

@Component({
  selector: 'app-room-to-list',
  templateUrl: './room-to-list.component.html',
  styleUrls: ['./room-to-list.component.css']
})
export class RoomToListComponent implements OnInit {

  @Input()
  title: string = "";
  
  @Input()
  image: string = "";

  @Input()
  description: string = "";

  @Input()
  codeRoom: string = "";

  tiles: Tile[] = [
    { title: this.title, cols: 1, rows: 1 },
    { cols: 3, rows: 3, image: this.image },
    { description: this.description, cols: 1, rows: 1 },
    { txtButton: 'Ver habitación', cols: 1, rows: 1, button: this.codeRoom },
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  viewRoom(): void {
    this.router.navigate(['/rooms/room', this.codeRoom]);
  }

  get contentRooms() {
    this.tiles[0].title = this.title;
    this.tiles[1].image = environment.urlBase + "/room/get-image/"+ this.image;
    this.tiles[2].description = this.description;
    this.tiles[3].button = this.codeRoom;
    
    return this.tiles;
  }

}
