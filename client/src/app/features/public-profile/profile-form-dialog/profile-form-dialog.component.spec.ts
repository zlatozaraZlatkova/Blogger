import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormDialogComponent } from './profile-form-dialog.component';

describe('ProfileFormDialogComponent', () => {
  let component: ProfileFormDialogComponent;
  let fixture: ComponentFixture<ProfileFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFormDialogComponent]
    });
    fixture = TestBed.createComponent(ProfileFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
