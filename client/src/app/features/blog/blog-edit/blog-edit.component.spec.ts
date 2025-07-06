import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditComponent } from './blog-edit.component';

describe('BlogEditComponent', () => {
  let component: BlogEditComponent;
  let fixture: ComponentFixture<BlogEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogEditComponent]
    });
    fixture = TestBed.createComponent(BlogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
