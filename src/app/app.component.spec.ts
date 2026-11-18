import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Gestión de videojuegos');
  });

  it('should start with the initial values and an invalid form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const form = fixture.componentInstance.gameFormGroup;
    expect(form.getRawValue()).toEqual({ title: '', genre: '', platform: '', price: 0, stock: 0 });
    expect(form.invalid).toBeTrue();
  });

  it('should not send a POST when the form is invalid', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne('http://localhost:3000/games').flush([]);

    const button = fixture.nativeElement.querySelector('button[type=submit]') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    http.expectNone('http://localhost:3000/games');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('El título es obligatorio.');
  });

  it('should send a POST when the form is valid', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne('http://localhost:3000/games').flush([]);

    fixture.componentInstance.gameFormGroup.setValue({
      title: 'Arena',
      genre: 'Action',
      platform: 'PC',
      price: 19.99,
      stock: 7
    });
    const button = fixture.nativeElement.querySelector('button[type=submit]') as HTMLButtonElement;
    button.click();

    const request = http.expectOne(req => req.method === 'POST');
    expect(request.request.body.title).toBe('Arena');
  });
});