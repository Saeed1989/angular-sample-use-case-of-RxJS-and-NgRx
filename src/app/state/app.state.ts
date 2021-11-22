import { LoadingSatate } from './loading.reducer';
import { UserState } from '../user/state/user.reducer';

export interface State {
  user: UserState;
  isLoading: LoadingSatate;
}
