import { createReducer } from '../../../../common/util/reducerUtils';
import {
  RECEPTIONS_GET,
  RECEPTION_CREATE,
  RECEPTION_UPDATE,
  RECEPTION_DELETE,
  RECEPTION_RESTORE,
  RECEPTION_HARDDEL,
} from './reduxConstant';

const initialState = [];

const receptionsGet = (state, payload) => {
  return [...payload.receptions];
};

const receptionCreate = (state, payload) => {
  const objs = [...state, payload.reception];
  const objsSort = objs.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );
  if (objsSort.length > 10) {
    objsSort.splice(-1, 1);
    return objsSort;
  }
  return objsSort;
};

const receptionUpdate = (state, payload) => {
  const objs = [
    ...state.filter((reception) => reception.id !== payload.reception.id),
    payload.reception,
  ];
  return objs.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );
};

const receptionDelete = (state, payload) => {
  return [...state.filter((reception) => reception.id !== payload.receptionId)];
};

const receptionRestore = (state, payload) => {
  return [...state.filter((reception) => reception.id !== payload.receptionId)];
};

const receptionHardDel = (state, payload) => {
  return [...state.filter((reception) => reception.id !== payload.receptionId)];
};

export default createReducer(initialState, {
  [RECEPTIONS_GET]: receptionsGet,
  [RECEPTION_CREATE]: receptionCreate,
  [RECEPTION_UPDATE]: receptionUpdate,
  [RECEPTION_DELETE]: receptionDelete,
  [RECEPTION_RESTORE]: receptionRestore,
  [RECEPTION_HARDDEL]: receptionHardDel,
});
