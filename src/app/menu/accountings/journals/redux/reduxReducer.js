import { createReducer } from '../../../../common/util/reducerUtils';
import {
  JOURNALS_GET,
  JOURNAL_CREATE,
  JOURNAL_UPDATE,
  JOURNAL_DELETE,
  JOURNAL_RESTORE,
  JOURNAL_HARDDEL,
} from './reduxConstant';

const initialState = [];

const journalsGet = (state, payload) => {
  return [...payload.journals];
};

const journalCreate = (state, payload) => {
  const objs = [...state, payload.journal];
  const objsSort = objs.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );
  if (objsSort.length > 10) {
    objsSort.splice(-1, 1);
    return objsSort;
  }
  return objsSort;
};

const journalUpdate = (state, payload) => {
  const objs = [
    ...state.filter((journal) => journal.id !== payload.journal.id),
    payload.journal,
  ];
  return objs.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
  );
};

const journalDelete = (state, payload) => {
  return [...state.filter((journal) => journal.id !== payload.journalId)];
};

const journalRestore = (state, payload) => {
  return [...state.filter((journal) => journal.id !== payload.journalId)];
};

const journalHardDel = (state, payload) => {
  return [...state.filter((journal) => journal.id !== payload.journalId)];
};

export default createReducer(initialState, {
  [JOURNALS_GET]: journalsGet,
  [JOURNAL_CREATE]: journalCreate,
  [JOURNAL_UPDATE]: journalUpdate,
  [JOURNAL_DELETE]: journalDelete,
  [JOURNAL_RESTORE]: journalRestore,
  [JOURNAL_HARDDEL]: journalHardDel,
});
