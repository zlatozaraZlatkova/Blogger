import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileComponent } from './public-profile.component';

describe('PublicProfileComponent', () => {
  let component: PublicProfileComponent;
  let fixture: ComponentFixture<PublicProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicProfileComponent]
    });
    fixture = TestBed.createComponent(PublicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
