import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMenuRestauComponent } from './set-menu-restau.component';

describe('SetEventComponent', () => {
  let component: SetMenuRestauComponent;
  let fixture: ComponentFixture<SetMenuRestauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetMenuRestauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMenuRestauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
