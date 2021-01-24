import { createReducer } from '../../../../common/util/reducerUtils';
import {
  SAVINGS_GET,
  SAVING_CREATE,
  SAVING_UPDATE,
  SAVING_DELETE,
  SAVING_RESTORE,
  SAVING_HARDDEL,
} from './reduxConstant';

const initialState = [];

const savingsGet = (state, payload) => {
  return [...payload.savings];
};

const savingCreate = (state, payload) => {
  const objs = [...state, payload.saving];
  const objsSort = objs.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );
  if (objsSort.length > 10) {
    objsSort.splice(-1, 1);
    return objsSort;
  }
  return objsSort;
};

const savingUpdate = (state, payload) => {
  const objs = [
    ...state.filter((saving) => saving.id !== payload.saving.id),
    payload.saving,
  ];
  return objs.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );
};

const savingDelete = (state, payload) => {
  return [...state.filter((saving) => saving.id !== payload.savingId)];
};

const savingRestore = (state, payload) => {
  return [...state.filter((saving) => saving.id !== payload.savingId)];
};

const savingHardDel = (state, payload) => {
  return [...state.filter((saving) => saving.id !== payload.savingId)];
};

export default createReducer(initialState, {
  [SAVINGS_GET]: savingsGet,
  [SAVING_CREATE]: savingCreate,
  [SAVING_UPDATE]: savingUpdate,
  [SAVING_DELETE]: savingDelete,
  [SAVING_RESTORE]: savingRestore,
  [SAVING_HARDDEL]: savingHardDel,
});
