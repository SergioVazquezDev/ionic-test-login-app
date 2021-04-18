import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { StorageMockService } from '../services/mocks/storage.service.mocks';
import { StorageService } from '../services/storage.service';
import { AuthGuard } from './auth.guard';


describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthenticationService;
  let storageService: StorageService;
  const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthGuard,
        AuthenticationService,
        { provide: Router, useValue: routerMock },
        { provide: StorageService, useClass: StorageMockService }
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthenticationService);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
