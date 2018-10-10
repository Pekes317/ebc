import { StateModule } from './state.module';

describe('StateModule', () => {
  let stateModule: StateModule;

  beforeEach(() => {
    stateModule = new StateModule(stateModule);
  });

  it('should create an instance', () => {
    expect(stateModule).toBeTruthy();
  });
});
