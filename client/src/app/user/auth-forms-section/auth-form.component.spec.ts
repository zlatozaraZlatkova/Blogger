import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormsSectionComponent } from './auth-forms-section.component';

describe('AuthFormComponent', () => {
  let component: AuthFormsSectionComponent;
  let fixture: ComponentFixture<AuthFormsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFormsSectionComponent]
    });
    fixture = TestBed.createComponent(AuthFormsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
