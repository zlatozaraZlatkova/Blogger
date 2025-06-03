import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleDriveUploadComponent } from './google-drive-upload.component';

describe('GoogleDriveUploadComponent', () => {
  let component: GoogleDriveUploadComponent;
  let fixture: ComponentFixture<GoogleDriveUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleDriveUploadComponent]
    });
    fixture = TestBed.createComponent(GoogleDriveUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
