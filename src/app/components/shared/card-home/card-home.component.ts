import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.css']
})
export class CardHomeComponent implements OnInit {

  @Input()
  public title: string = "";

  @Input()
  public description: string = "";

  @Input()
  public image: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  get imageNameWithoutExt(): string {
    return this.image.substring(0, this.image.lastIndexOf('.'));
  }

}
