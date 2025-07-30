import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditComponent } from './blog-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('BlogEditComponent', () => {
  let component: BlogEditComponent;
  let fixture: ComponentFixture<BlogEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogEditComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: { subscribe: () => {} },
            snapshot: {
             paramMap: {
                get: (key: string) => '123',
              },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(BlogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
