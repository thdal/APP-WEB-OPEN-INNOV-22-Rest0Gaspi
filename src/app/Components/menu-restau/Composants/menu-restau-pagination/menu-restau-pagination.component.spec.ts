import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRestauPaginationComponent } from './menu-restau-pagination.component';

describe('EventPaginationComponent', () => {
  let component: MenuRestauPaginationComponent;
  let fixture: ComponentFixture<MenuRestauPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRestauPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRestauPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
