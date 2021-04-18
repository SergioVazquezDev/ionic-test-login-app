import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StorageMockService } from 'src/app/services/mocks/storage.service.mocks';
import { StorageService } from 'src/app/services/storage.service';
import { IntroPage } from './intro.page';

describe('IntroPage', () => {
  let component: IntroPage;
  let fixture: ComponentFixture<IntroPage>;
  let storageService: StorageService;
  const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IntroPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: StorageService, useClass: StorageMockService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IntroPage);
    storageService = TestBed.inject(StorageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should next slide when call next', () => {
    const spySlideNext = spyOn(component.slides, 'slideNext');
    component.next();
    expect(spySlideNext).toHaveBeenCalled();
  });

  it('should set intro key in storage and navigate to login when call start', async () => {
    const spyStorageSet = spyOn(storageService, 'set');
    await component.start();
    expect(spyStorageSet).toHaveBeenCalled();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login', Object({ replaceUrl: true }));

  });
});
