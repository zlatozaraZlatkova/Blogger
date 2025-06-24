import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeIconComponent } from './eye-icon.component';

describe('EyeIconComponent', () => {
  let component: EyeIconComponent;
  let fixture: ComponentFixture<EyeIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EyeIconComponent]
    });
    fixture = TestBed.createComponent(EyeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
