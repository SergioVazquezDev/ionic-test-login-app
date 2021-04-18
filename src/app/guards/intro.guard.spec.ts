import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StorageMockService } from '../services/mocks/storage.service.mocks';
import { StorageService } from '../services/storage.service';
import { IntroGuard } from './intro.guard';

describe('IntroGuard', () => {
  let guard: IntroGuard;
  let storageService: StorageService;
  const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        IntroGuard,
        { provide: Router, useValue: routerMock },
        { provide: StorageService, useClass: StorageMockService }
      ],
    });
    guard = TestBed.inject(IntroGuard);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true when has seen intro', fakeAsync(() => {
    const spyGetIntoKey = spyOn(storageService, 'get').and.returnValue(Promise.resolve('true'));

    guard.canLoad();
    tick();

    expect(spyGetIntoKey).toHaveBeenCalled();
  }));

  it('should return true and redirect intro when has not seen intro', fakeAsync(() => {
    const spyGetIntoKey = spyOn(storageService, 'get').and.returnValue(Promise.resolve('false'));

    guard.canLoad();
    tick();

    expect(spyGetIntoKey).toHaveBeenCalled();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/intro', Object({ replaceUrl: true }));
  }));
});




