import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidDlgComponent } from './valid-dlg.component';

describe('ValidDlgComponent', () => {
  let component: ValidDlgComponent;
  let fixture: ComponentFixture<ValidDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
