import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AuthenticationService } from '../services/authentication.service';
import { StorageMockService } from '../services/mocks/storage.service.mocks';
import { StorageService } from '../services/storage.service';
import { Tab1Page } from './tab1.page';


describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let authService: AuthenticationService;
  let storageService: StorageService;

  const routerMock = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule, HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: Router, useValue: routerMock },
        { provide: StorageService, useClass: StorageMockService }
      ],

    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect root when logout', fakeAsync(() => {
    const spyGetIntoKey = spyOn(authService, 'logout');

    component.logout();
    tick();
    expect(spyGetIntoKey).toHaveBeenCalled();

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/', Object({ replaceUrl: true }));
  }));
});
