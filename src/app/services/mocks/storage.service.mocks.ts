import { Injectable } from '@angular/core';

@Injectable()
export class StorageMockService {
  public hasBeenCalled = false;

  public callStorageFake(): Promise<any> {
    return new Promise((resolve) => {
      this.hasBeenCalled = true;
      resolve();
    });
  }

  public create(): Promise<any> {
    return this.callStorageFake();
  }

  public get(): Promise<any> {
    return this.callStorageFake();
  }

  public set(): Promise<any> {
    return this.callStorageFake();
  }

  public remove(): Promise<any> {
    return this.callStorageFake();
  }

}
