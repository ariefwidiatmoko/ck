import React from 'react'
import {connect} from 'react-redux';
import TestModal from './TestModal';
import SessionEndModal from './SessionEndModal';
import MemberDelete from '../membership/members/Delete';
import DeleteUserModal from './DeleteUserModal';
import NotAuthorizedModal from './NotAuthorizedModal';
import ActivationModal from './ActivationModal';

const modalLookup = {
    TestModal,
    SessionEndModal,
    MemberDelete,
    NotAuthorizedModal,
    ActivationModal,
    DeleteUserModal,
}

const mapState = (state) => ({
    currentModal: state.modals
})

const ModalManager = ({currentModal}) => {
    let renderedModal;

    if(currentModal) {
        const {modalType, modalProps} = currentModal;
        const ModalComponent = modalLookup[modalType];

        renderedModal = <ModalComponent {...modalProps} />
    }
    return (
        <span>{renderedModal}</span>
    )
}

export default connect(mapState)(ModalManager)
