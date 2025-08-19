import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let paramMapSubject: BehaviorSubject<ParamMap>;
  let snapshotParamMap: ParamMap;

  const mockMainData = {
    title: 'Component title',
    layout: 'default',
    showHeader: false,
    showFooter: false
  };

  beforeEach(() => {
    paramMapSubject = new BehaviorSubject(convertToParamMap({ id: '123' }));
    snapshotParamMap = convertToParamMap({ id: '123' });

    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramMapSubject.asObservable(),
            snapshot: {
              paramMap: snapshotParamMap,
              data: { data: mockMainData }
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should always render main with correct classes', () => {
    fixture.detectChanges();

    const main = fixture.nativeElement.querySelector('main');
    expect(main).toBeTruthy();
    expect(main.className).toContain('bg-white');
    expect(main.className).toContain('main-content');
  });


  it('should always render router-outlet', () => {
    fixture.detectChanges();

    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should always render error notification', () => {
    fixture.detectChanges();

    const errorNotification = fixture.nativeElement.querySelector('app-error-notification');
    expect(errorNotification).toBeTruthy();
  });

  it('should show header when showHeader is true', () => {
    component.showHeader = true;
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('app-header');
    expect(header).toBeTruthy();
  });

  it('should hide header when showHeader is false', () => {
    component.showHeader = false;
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('app-header');
    expect(header).toBeFalsy();
  });


  it('should show footer when showFooter is true', () => {
    component.showFooter = true;
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('app-footer');
    expect(header).toBeTruthy();
  });

  it('should hide footer when showFooter is false', () => {
    component.showFooter = false;
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('app-footer');
    expect(header).toBeFalsy();
  });


  it('should render default layout with all components', () => {
    component.currentLayout = 'default';
    component.showHeader = true;
    component.showFooter = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-header')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('main')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-footer')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-error-notification')).toBeTruthy();
  });


  it('should render auth layout with main and error-notification components', () => {
    component.currentLayout = 'auth';
    component.showHeader = false;
    component.showFooter = false;
    fixture.detectChanges();


    expect(fixture.nativeElement.querySelector('main')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-error-notification')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-header')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('app-footer')).toBeFalsy();

  });



});
