import { createReducer } from '../../../../common/util/reducerUtils';
import {
  AUTOJOURNALS_GET,
  AUTOJOURNAL_CREATE,
  AUTOJOURNAL_UPDATE,
  AUTOJOURNAL_DELETE,
  AUTOJOURNAL_RESTORE,
  AUTOJOURNAL_HARDDEL,
} from './reduxConstant';

const initialState = [];

const autoJournalsGet = (state, payload) => {
  return [...payload.autoJournals];
};

const autoJournalCreate = (state, payload) => {
  const objs = [...state, payload.autoJournal];
  return objs.sort((a, b) => (a.code > b.code ? 1 : b.code > a.code ? -1 : 0));
};

const autoJournalUpdate = (state, payload) => {
  const objs = [
    ...state.filter((autoJournal) => autoJournal.id !== payload.autoJournal.id),
    payload.autoJournal,
  ];
  return objs.sort((a, b) => (a.code > b.code ? 1 : b.code > a.code ? -1 : 0));
};

const autoJournalDelete = (state, payload) => {
  const objs = [
    ...state.filter((autoJournal) => autoJournal.id !== payload.autoJournalId),
  ];
  return objs.sort((a, b) => (a.code > b.code ? 1 : b.code > a.code ? -1 : 0));
};

const autoJournalRestore = (state, payload) => {
  return [...state.filter((autoJournal) => autoJournal.id !== payload.autoJournalId)];
};

const autoJournalHardDel = (state, payload) => {
  return [...state.filter((autoJournal) => autoJournal.id !== payload.autoJournalId)];
};

export default createReducer(initialState, {
  [AUTOJOURNALS_GET]: autoJournalsGet,
  [AUTOJOURNAL_CREATE]: autoJournalCreate,
  [AUTOJOURNAL_UPDATE]: autoJournalUpdate,
  [AUTOJOURNAL_DELETE]: autoJournalDelete,
  [AUTOJOURNAL_RESTORE]: autoJournalRestore,
  [AUTOJOURNAL_HARDDEL]: autoJournalHardDel,
});
