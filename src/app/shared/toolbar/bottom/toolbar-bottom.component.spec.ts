import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarBottomComponent } from './toolbar-bottom.component';

describe('ToolbarBottomComponent', () => {
  let component: ToolbarBottomComponent;
  let fixture: ComponentFixture<ToolbarBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarBottomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
