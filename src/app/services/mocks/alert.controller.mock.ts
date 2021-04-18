export class AlertMock {
  constructor(props: any) {
    Object.assign(this, props);
  }

  present() {
    return Promise.resolve(true);
  }

  dismiss() {
    return Promise.resolve(true);
  }
}

export class AlertControllerMock {

  create(props: any): Promise<any> {
    return Promise.resolve(new AlertMock(props));
  }
}
