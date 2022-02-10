import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutDlgComponent } from './logout-dlg.component';

describe('LogoutDlgComponent', () => {
  let component: LogoutDlgComponent;
  let fixture: ComponentFixture<LogoutDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
