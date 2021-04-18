import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { StorageMockService } from './storage.service.mocks';


describe('StorageMockService', () => {
  let storageProvider;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageMockService],
      imports: [HttpClientTestingModule]
    });
    storageProvider = TestBed.inject(StorageMockService);
  });

  it('Should be defined the storage mock service', () => {
    expect(storageProvider).toBeDefined();
  });

  it(' Should resolve promise', fakeAsync(() => {
    storageProvider.hasBeenCalled = false;
    storageProvider
      .create()
      .then(() => expect(storageProvider.hasBeenCalled).toBeTruthy());

    storageProvider.hasBeenCalled = false;
    storageProvider
      .remove()
      .then(() => expect(storageProvider.hasBeenCalled).toBeTruthy());

    storageProvider.hasBeenCalled = false;
    storageProvider
      .set()
      .then(() => expect(storageProvider.hasBeenCalled).toBeTruthy());

    storageProvider.hasBeenCalled = false;
    storageProvider
      .get()
      .then(() => expect(storageProvider.hasBeenCalled).toBeTruthy());
  }));
});
