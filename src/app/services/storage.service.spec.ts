import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './storage.service';


class StorageMock {
  create() {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  get(key) {
    return new Promise((resolve) => {
      resolve('value');
    });
  }

  set(key, value) {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }

  remove(key) {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }
}


describe('StorageService', () => {
  let service: StorageService;
  let storage: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: Storage, useClass: StorageMock }
      ],
      imports: [IonicStorageModule.forRoot(), HttpClientTestingModule]
    });
    service = TestBed.inject(StorageService);
    storage = TestBed.inject(Storage);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
