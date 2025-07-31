import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterComponent } from './typewriter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('TypewriterComponent', () => {
  let component: TypewriterComponent;
  let fixture: ComponentFixture<TypewriterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypewriterComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(TypewriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display text', () => {

    component.displayedText.set('Signal');
    fixture.detectChanges();

    const code = fixture.nativeElement.querySelector('code');

    expect(code.textContent).toContain('Signal');
  });



  it('should display text with CSS class text-green-400', () => {

    component.displayedText.set('Some green text');
    fixture.detectChanges();

    const code = fixture.nativeElement.querySelector('code');

    expect(code.classList).toContain('text-green-400');
  });



  it('should initialize displayedText as empty string', () => {

    component.displayedText.set('');
    fixture.detectChanges();

    expect(component.displayedText()).toBe('');

  });



});
