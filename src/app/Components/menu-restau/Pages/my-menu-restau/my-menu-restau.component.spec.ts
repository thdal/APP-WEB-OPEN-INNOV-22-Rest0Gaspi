import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMenuRestauComponent } from './my-menu-restau.component';

describe('MyEventsComponent', () => {
  let component: MyMenuRestauComponent;
  let fixture: ComponentFixture<MyMenuRestauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMenuRestauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMenuRestauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
