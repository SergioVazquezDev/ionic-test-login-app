import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { StorageMockService } from './mocks/storage.service.mocks';
import { StorageService } from './storage.service';


describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let storageService: StorageService;



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: StorageService, useClass: StorageMockService }
      ],
    });
    service = TestBed.inject(AuthenticationService);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return storage token when call load token', fakeAsync(() => {
    const spyGetTokenKey = spyOn(storageService, 'get').and.returnValue(Promise.resolve('123456789adja87asd554a'));

    service.loadToken();
    tick();

    expect(spyGetTokenKey).toHaveBeenCalled();
  }));

  it('should remove storage token when loguot', fakeAsync(() => {
    const spyRemoveTokenKey = spyOn(storageService, 'remove').and.returnValue(Promise.resolve());

    service.logout();
    tick();

    expect(spyRemoveTokenKey).toHaveBeenCalled();
  }));
});
