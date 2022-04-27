import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRestauFormComponent } from './menu-restau-form.component';

describe('EventFormComponent', () => {
  let component: MenuRestauFormComponent;
  let fixture: ComponentFixture<MenuRestauFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRestauFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRestauFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
