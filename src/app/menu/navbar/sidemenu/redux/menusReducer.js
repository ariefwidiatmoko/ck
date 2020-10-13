import { MENUS_GET } from './menusConstant';
import { createReducer } from '../../../../common/util/reducerUtils';

const initialState = [];

const menusGet = (state, payload) => {
  return [...payload.menus];
};

export default createReducer(initialState, {
  [MENUS_GET]: menusGet,
});
