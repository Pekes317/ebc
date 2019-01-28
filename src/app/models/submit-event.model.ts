import { State as Data } from '../state/form-store/reducers/form-data.reducer';
import { State } from '../state/form-store/reducers/form-state.reducer';

export interface SubmitEvent {
  data?: Partial<Data>;
  state?: Partial<State>;
}
