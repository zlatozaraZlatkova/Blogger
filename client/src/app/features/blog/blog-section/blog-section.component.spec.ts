import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSectionComponent } from './blog-section.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BlogSectionComponent', () => {
  let component: BlogSectionComponent;
  let fixture: ComponentFixture<BlogSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogSectionComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatDialog, useValue: { open: () => { } } },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
            params: { subscribe: () => { } },
            snapshot: { params: {} }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(BlogSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
