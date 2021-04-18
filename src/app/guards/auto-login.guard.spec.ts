import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { StorageMockService } from '../services/mocks/storage.service.mocks';
import { StorageService } from '../services/storage.service';
import { AutoLoginGuard } from './auto-login.guard';

describe('AutoLoginGuard', () => {
  let guard: AutoLoginGuard;
  let authService: AuthenticationService;
  const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AutoLoginGuard,
        AuthenticationService,
        { provide: Router, useValue: routerMock },
        { provide: StorageService, useClass: StorageMockService }],
    });
    guard = TestBed.inject(AutoLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

