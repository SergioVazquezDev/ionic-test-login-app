import { TestBed } from '@angular/core/testing';
import { AlertControllerMock, AlertMock } from './alert.controller.mock';

describe('AlertControllerMock', () => {
  let alertController: AlertControllerMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertControllerMock]
    });
    alertController = TestBed.inject(AlertControllerMock);
  });

  it('Should be defined the alert controller mock', () => {
    expect(alertController).toBeDefined();
  });

  it('Should resolve promise', async () => {
    const alert = await alertController.create({});
    expect(alert instanceof AlertMock).toBeTruthy();

    await alert.present();
    const dismiss = await alert.dismiss();
    expect(dismiss).toBeTruthy();
  });
});
