import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleDriveUploadComponent } from './google-drive-upload.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('GoogleDriveUploadComponent', () => {
  let component: GoogleDriveUploadComponent;
  let fixture: ComponentFixture<GoogleDriveUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleDriveUploadComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(GoogleDriveUploadComponent);
    component = fixture.componentInstance;

    component.parentForm = new FormGroup({
      postImageUrl: new FormControl('')
    });


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
