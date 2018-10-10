import { UserStoreModule } from './user-store.module';

describe('UserStoreModule', () => {
  let userStoreModule: UserStoreModule;

  beforeEach(() => {
    userStoreModule = new UserStoreModule();
  });

  it('should create an instance', () => {
    expect(userStoreModule).toBeTruthy();
  });
});
