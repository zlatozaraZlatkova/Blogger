import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileDetailsComponent } from './public-profile-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('PublicProfileDetailsComponent', () => {
  let component: PublicProfileDetailsComponent;
  let fixture: ComponentFixture<PublicProfileDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicProfileDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: {
              paramMap: {
                get: (key: string) => 'user-id'
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(PublicProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
