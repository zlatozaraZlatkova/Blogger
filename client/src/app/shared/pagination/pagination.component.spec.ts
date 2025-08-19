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


  it('should display  page buttons with all pages', () => {

    component.paginationData = {
      hasPrevPage: true,
      hasNextPage: true,
      currentPage: 3,
      totalPages: 5,
      totalItems: 25
    } as IPagination


    fixture.detectChanges();

    const pageNumbers = component.getPageNumbers();

    expect(pageNumbers).toEqual([1, 2, 3, 4, 5]);


  });

  it('should not render page buttons when totalPages is 0', () => {
    component.paginationData = { totalPages: 0 } as IPagination;
    fixture.detectChanges();

    const pageButtons = fixture.nativeElement.querySelectorAll('button.page-button');
    expect(pageButtons.length).toBe(0);
  });


  it('should return all pages when totalPages is small', () => {
    component.paginationData = { totalPages: 3 } as IPagination;

    const result = component.getPageNumbers();
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle pagination with ellipsis when totalPages is large', () => {
    component.paginationData = { totalPages: 20, currentPage: 10 } as IPagination;

    const result = component.getPageNumbers();

    expect(result.length).toBe(20);
    expect(result[0]).toBe(1);
    expect(result[19]).toBe(20);
  });

  it('should handle zero totalPages', () => {
    component.paginationData = { totalPages: 0 } as IPagination;

    const result = component.getPageNumbers();
    expect(result).toEqual([]);
  });

  it('should handle negative totalPages', () => {
    component.paginationData = { totalPages: -1 } as IPagination;

    const result = component.getPageNumbers();
    expect(result).toEqual([]);
  });

  it('should display current page button (page 3)', () => {

    component.paginationData = {
      hasPrevPage: true,
      hasNextPage: true,
      currentPage: 3,
      totalPages: 5,
      totalItems: 25
    } as IPagination


    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button.page-button') as NodeListOf<HTMLButtonElement>;

    const activeButton = Array.from(buttons).find(btn => btn.textContent?.trim() === '3');

    expect(activeButton?.textContent?.trim()).toEqual('3');
  });


  it('should apply active class to the current page button (page 3)', () => {

    component.paginationData = {
      hasPrevPage: true,
      hasNextPage: true,
      currentPage: 3,
      totalPages: 5,
      totalItems: 25
    } as IPagination


    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button.page-button') as NodeListOf<HTMLButtonElement>;

    const activeButton = Array.from(buttons).find(btn => btn.textContent?.trim() === '3')


    expect(activeButton?.classList).toContain('page-button--active');
  });


  it('should apply inactive class to non-current page button (page 1)', () => {

    component.paginationData = {
      hasPrevPage: true,
      hasNextPage: true,
      currentPage: 3,
      totalPages: 5,
      totalItems: 25
    } as IPagination


    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button.page-button') as NodeListOf<HTMLButtonElement>;

    const notActiveButton = Array.from(buttons).find(btn => btn.textContent?.trim() !== '3')


    expect(notActiveButton?.classList).toContain('page-button--inactive');
  });


  it('should call onPrevious() when button is clicked', () => {

    component.paginationData = {
      hasPrevPage: true,
      hasNextPage: false,
      currentPage: 1,
      totalPages: 1,
      totalItems: 5
    } as IPagination

    spyOn(component, 'onPrevious');

    fixture.detectChanges();


    const button = fixture.nativeElement.querySelector('button.previous.nav-button');

    button.click();

    expect(component.onPrevious).toHaveBeenCalled();

  });


  it('should call onNext() when button is clicked', () => {
    component.paginationData = {
      hasPrevPage: true,
      hasNextPage: true,
      currentPage: 2,
      totalPages: 3,
      totalItems: 15
    } as IPagination

    spyOn(component, 'onNext');

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button.next.nav-button');

    button.click();

    expect(component.onNext).toHaveBeenCalled();

  });

  it('should call onPageChange() when button is clicked', () => {

    spyOn(component, 'onPageChange');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button.page-button');

    button.click();

    expect(component.onPageChange).toHaveBeenCalled();

  });

  it('should call onPageChange(5) with correct page number when button is clicked', () => {

    component.paginationData = {
      hasPrevPage: true,
      hasNextPage: true,
      currentPage: 5,
      totalPages: 10,
      totalItems: 50
    } as IPagination

    spyOn(component, 'onPageChange');
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button.page-button');

    buttons[4].click();

    expect(component.onPageChange).toHaveBeenCalledWith(5);

  });


});
