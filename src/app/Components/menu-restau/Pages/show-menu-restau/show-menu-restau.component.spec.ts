import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMenuRestauComponent } from './show-menu-restau.component';

describe('ShowEventComponent', () => {
  let component: ShowMenuRestauComponent;
  let fixture: ComponentFixture<ShowMenuRestauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMenuRestauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMenuRestauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
