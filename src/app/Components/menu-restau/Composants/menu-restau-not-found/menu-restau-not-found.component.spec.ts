import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRestauNotFoundComponent } from './menu-restau-not-found.component';

describe('EventNotFoundComponent', () => {
  let component: MenuRestauNotFoundComponent;
  let fixture: ComponentFixture<MenuRestauNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRestauNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRestauNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
