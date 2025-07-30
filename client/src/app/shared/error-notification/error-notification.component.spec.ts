import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNotificationComponent } from './error-notification.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ErrorNotificationComponent', () => {
  let component: ErrorNotificationComponent;
  let fixture: ComponentFixture<ErrorNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorNotificationComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ErrorNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
