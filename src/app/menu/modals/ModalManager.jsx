import React from 'react';
import { connect } from 'react-redux';
import TestModal from './TestModal';
import SessionEndModal from './SessionEndModal';
import MemberDelete from '../membership/members/Delete';
import MemberRestore from '../membership/members/Restore';
import MemberHardDel from '../membership/members/HardDel';
import AccountForm from '../accountings/accounts/Form';
import AccountDelete from '../accountings/accounts/Delete';
import AccountRestore from '../accountings/accounts/Restore';
import AccountHardDel from '../accountings/accounts/HardDel';
import SavingAdd from '../finances/savings/AddForm';
import SavingEdit from '../finances/savings/EditForm';
import SavingDelete from '../finances/savings/Delete';
import SavingRestore from '../finances/savings/Restore';
import SavingHardDel from '../finances/savings/HardDel';
import LoanAdd from '../finances/loans/Add';
import LoanEdit from '../finances/loans/Edit';
import LoanDelete from '../finances/loans/Delete';
import LoanRestore from '../finances/loans/Restore';
import LoanHardDel from '../finances/loans/HardDel';
import installmentEdit from '../finances/installments/Edit';
import installmentDelete from '../finances/installments/Delete';
import ReceptionAdd from '../finances/receptions/Add';
import JournalPickAccount from '../accountings/journals/Form/PickAccount';
import AutoJournalForm from '../settings/autoJournal/Form';
import UserDelete from '../users-management/Users/Delete';
import UserRestore from '../users-management/Users/Restore';
import UserHardDel from '../users-management/Users/HardDel';
import RecyclebinRestore from '../recyclebin/Restore';
import RecyclebinDelete from '../recyclebin/Delete';
import AdvanceSearch from './AdvanceSearch';
import NotAuthorizedModal from './NotAuthorizedModal';
import ActivationModal from './ActivationModal';

const modalLookup = {
  TestModal,
  SessionEndModal,
  MemberDelete,
  MemberRestore,
  MemberHardDel,
  AccountForm,
  AccountDelete,
  AccountRestore,
  AccountHardDel,
  SavingAdd,
  SavingEdit,
  SavingDelete,
  SavingRestore,
  SavingHardDel,
  LoanAdd,
  LoanEdit,
  LoanDelete,
  LoanRestore,
  LoanHardDel,
  installmentEdit,
  installmentDelete,
  ReceptionAdd,
  JournalPickAccount,
  AutoJournalForm,
  UserDelete,
  UserRestore,
  UserHardDel,
  RecyclebinRestore,
  RecyclebinDelete,
  AdvanceSearch,
  NotAuthorizedModal,
  ActivationModal,
};

const mapState = (state) => ({
  currentModal: state.modals,
});

const ModalManager = ({ currentModal }) => {
  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
};

export default connect(mapState)(ModalManager);
