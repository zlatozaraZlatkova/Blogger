import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IPagination } from 'src/app/interfaces/pagination';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;

    component.paginationData = {
      hasPrevPage: false,
      hasNextPage: false,
      currentPage: 1,
      totalPages: 1,
      totalItems: 10
    } as IPagination

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set disabled attribute when paginationData has NO PrevPage', () => {

    component.paginationData = {
      hasPrevPage: false,
      hasNextPage: true,
      currentPage: 1,
      totalPages: 1,
      totalItems: 10
    } as IPagination

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button.previous.nav-button');

    expect(button.disabled).toBe(true);
  });


  it('should NOT set disabled attribute when paginationData HAS PrevPage', () => {

    component.paginationData = {
      hasPrevPage: true,
      hasNextPage: true,
      currentPage: 2,
      totalPages: 3,
      totalItems: 10
    } as IPagination

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button.previous.nav-button');

    expect(button.disabled).toBe(false);
  });



  it('should set disabled attribute when paginationData has NOT NextPage', () => {

    component.paginationData = {
      hasPrevPage: true,
      hasNextPage: false,
      currentPage: 2,
      totalPages: 2,
      totalItems: 10
    } as IPagination

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button.next.nav-button');

    expect(button.disabled).toBe(true);
  });


  it('should NOT set disabled attribute when paginationData HAS NextPage', () => {

    component.paginationData = {
      hasPrevPage: true,
      hasNextPage: true,
      currentPage: 1,
      totalPages: 2,
      totalItems: 10
    } as IPagination

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button.next.nav-button')

    expect(button.disabled).toBe(false);
  });





});
