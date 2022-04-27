import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuRestauComponent } from './add-menu-restau.component';

describe('AddEventComponent', () => {
  let component: AddMenuRestauComponent;
  let fixture: ComponentFixture<AddMenuRestauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuRestauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuRestauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
