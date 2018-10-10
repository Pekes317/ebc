import { ItemStoreModule } from './item-store.module';

describe('ItemsStoreModule', () => {
  let itemStoreModule: ItemStoreModule;

  beforeEach(() => {
    itemStoreModule = new ItemStoreModule();
  });

  it('should create an instance', () => {
    expect(itemStoreModule).toBeTruthy();
  });
});
