import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormsSectionComponent } from './auth-forms-section.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AuthFormComponent', () => {
  let component: AuthFormsSectionComponent;
  let fixture: ComponentFixture<AuthFormsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFormsSectionComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(AuthFormsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
