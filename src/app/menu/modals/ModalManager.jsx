import React from 'react'
import {connect} from 'react-redux';
import TestModal from './TestModal';
import SessionEndModal from './SessionEndModal';
import DeleteUserModal from './DeleteUserModal';
import NotAuthorizedModal from './NotAuthorizedModal';
import ActivationModal from './ActivationModal';
// import DeletePostModal from './DeletePostModal';

const modalLookup = {
    TestModal,
    SessionEndModal,
    NotAuthorizedModal,
    ActivationModal,
    DeleteUserModal,
    // DeletePostModal
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
