import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomToListComponent } from './room-to-list.component';

describe('RoomToListComponent', () => {
  let component: RoomToListComponent;
  let fixture: ComponentFixture<RoomToListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomToListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
