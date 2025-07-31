import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNotificationComponent } from './error-notification.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ErrorNotificationComponent', () => {
  let component: ErrorNotificationComponent;
  let fixture: ComponentFixture<ErrorNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorNotificationComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ErrorNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display provided message in DOM', () => {
    component.errResponseMsg = 'Please login';
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector('div.error-message');

    expect(div.textContent).toContain('Please login');
  });


  it('should display error message with CSS style text-red-700', () => {
    component.errResponseMsg = 'Error';
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector('div.error-message');

    expect(div.classList).toContain('text-red-700');
  });

  it('should display svg icon', () => {
    component.errResponseMsg = 'Error';
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg');

    expect(svg).toBeTruthy();
  });


  it('should display error container with message', () => {
    component.errResponseMsg = 'Please login';
    fixture.detectChanges();

    const divContainer = fixture.nativeElement.querySelector('div.error-container');

    expect(divContainer).toBeTruthy();
  });


  it('should NOT display error container when NO error message', () => {
    component.errResponseMsg = '';
    fixture.detectChanges();

    const divContainer = fixture.nativeElement.querySelector('div.error-container');

    expect(divContainer).toBeFalsy();
  });



});
