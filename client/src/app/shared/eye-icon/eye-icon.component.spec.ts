import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeIconComponent } from './eye-icon.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EyeIconComponent', () => {
  let component: EyeIconComponent;
  let fixture: ComponentFixture<EyeIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EyeIconComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(EyeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
