import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRestauViewComponent } from './menu-restau-view.component';

describe('EventViewComponent', () => {
  let component: MenuRestauViewComponent;
  let fixture: ComponentFixture<MenuRestauViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRestauViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRestauViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
