import { State as Data } from '../state/form-store/reducers/form-data.reducer';
import { State } from '../state/form-store/reducers/form-data.reducer';

export interface SubmitEvent {
  data: Data;
  state: State;
}
