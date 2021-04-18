import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StorageMockService } from 'src/app/services/mocks/storage.service.mocks';
import { StorageService } from 'src/app/services/storage.service';
import { AuthenticationService } from './../../services/authentication.service';
import { LoginPage } from './login.page';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: AuthenticationService;
  const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthenticationService,
        { provide: Router, useValue: routerMock },
        { provide: StorageService, useClass: StorageMockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    authService = TestBed.inject(AuthenticationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form invalid when empty', () => {
    expect(component.credentials.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    const email = component.credentials.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();

    // Set email to something correct
    email.setValue('test@example.com');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    const password = component.credentials.controls['password'];

    // Password field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set password to something
    password.setValue('123');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    // Set password to something correct
    password.setValue('12345');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('should not call login when submit with error credential', () => {
    const spyLogin = spyOn(component, 'login');
    expect(component.credentials.valid).toBeFalsy();

    component.submitForm();

    expect(spyLogin).not.toHaveBeenCalled();
  });

  it('should show error messages login when submit with error credential', () => {
    const spyLogin = spyOn(component, 'login');
    expect(component.credentials.valid).toBeFalsy();

    component.submitForm();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.errors'));
    expect(errorMessage).toBeTruthy();
  });

  it('should animate icons when submit with error credential', () => {
    const spyAnimation = spyOn(component, 'startRotateAnimation');
    expect(component.credentials.valid).toBeFalsy();

    component.submitForm();

    expect(spyAnimation).toHaveBeenCalled();
  });

  it('should call login when submit with correct credential', () => {
    const spyLogin = spyOn(component, 'login');
    expect(component.credentials.valid).toBeFalsy();
    component.credentials.controls['email'].setValue('test@test.com');
    component.credentials.controls['password'].setValue('12345');
    expect(component.credentials.valid).toBeTruthy();

    component.submitForm();

    expect(spyLogin).toHaveBeenCalled();
  });

  it('should call login when submit with correct credential', () => {
    const spyLogin = spyOn(component, 'login');
    expect(component.credentials.valid).toBeFalsy();
    component.credentials.controls['email'].setValue('test@test.com');
    component.credentials.controls['password'].setValue('12345');
    expect(component.credentials.valid).toBeTruthy();

    component.submitForm();

    expect(spyLogin).toHaveBeenCalled();
  });

  it('should remember value change when touch it', () => {
    expect(component.credentials.controls['remember'].value).toBe(false);

    component.rememberChangeValue();
    fixture.detectChanges();

    expect(component.credentials.controls['remember'].value).toBe(true);
  });

  it('should remember value change when touch it', () => {
    expect(component.credentials.controls['remember'].value).toBe(false);

    component.rememberChangeValue();
    fixture.detectChanges();

    expect(component.credentials.controls['remember'].value).toBe(true);
  });
});
