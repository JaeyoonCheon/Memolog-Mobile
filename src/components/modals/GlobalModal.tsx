import React from 'react';

import {useAppSelector, useAppDispatch} from '@redux/hooks';
import AlertModal, {AlertModalProps} from '@components/modals/AlertModal';
import ConfirmModal, {ConfirmModalProps} from './ConfirmModal';

export const MODAL_TYPES = {
  AlertModal: 'AlertModal',
  ConfirmModal: 'ConfirmModal',
} as const;

// 추후 타입 개편
const MODAL = {
  [MODAL_TYPES.AlertModal]: AlertModal,
  [MODAL_TYPES.ConfirmModal]: ConfirmModal,
};

const GlobalModal = () => {
  const {modalType, isActive, modalProps} = useAppSelector(
    state => state.modal,
  );
  const dispatch = useAppDispatch();

  if (!isActive) return null;

  const renderModal = () => {
    let ModalComponent;
    let ModalProps;

    if (modalType === 'AlertModal') {
      ModalComponent = MODAL[modalType];
      ModalProps = modalProps as AlertModalProps;

      return <ModalComponent {...ModalProps}></ModalComponent>;
    } else if (modalType === 'ConfirmModal') {
      ModalComponent = MODAL[modalType];
      ModalProps = modalProps as ConfirmModalProps;

      return <ModalComponent {...ModalProps}></ModalComponent>;
    } else {
      return null;
    }
  };

  return <>{renderModal()}</>;
};

export default GlobalModal;
