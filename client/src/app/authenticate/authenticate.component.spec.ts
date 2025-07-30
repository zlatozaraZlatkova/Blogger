import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateComponent } from './authenticate.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('AuthenticateComponent', () => {
  let component: AuthenticateComponent;
  let fixture: ComponentFixture<AuthenticateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticateComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: { subscribe: () => { } },
            snapshot: {
              params: {},
              data: { user: null }
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(AuthenticateComponent);
    component = fixture.componentInstance;



    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
