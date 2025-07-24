import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileDetailsComponent } from './public-profile-details.component';

describe('PublicProfileDetailsComponent', () => {
  let component: PublicProfileDetailsComponent;
  let fixture: ComponentFixture<PublicProfileDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicProfileDetailsComponent]
    });
    fixture = TestBed.createComponent(PublicProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
