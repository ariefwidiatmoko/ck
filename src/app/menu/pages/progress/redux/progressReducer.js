import { createReducer } from '../../../../common/util/reducerUtils';
import { PROGRESS_PERCENT } from './progressConstant';

const initialState = 0;

const progressPercent = (state, payload) => {
  return payload.percent;
};

export default createReducer(initialState, {
  [PROGRESS_PERCENT]: progressPercent,
});
