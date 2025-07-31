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


  it('should display open eye icon when closed is false', () => {
    component.closed = false;
    fixture.detectChanges();

   const openPath = fixture.nativeElement.querySelector('path.open-eye');

    expect(openPath).toBeTruthy();
  });



  it('should display closed eye icon when closed is true', () => {
    component.closed = true;
    fixture.detectChanges();

   
    const closedPath = fixture.nativeElement.querySelector('path.closed-eye');

    expect(closedPath).toBeTruthy();
  });



});
