import React from 'react';

import {useAppSelector, useAppDispatch} from '@redux/hooks';
import AlertModal from '@components/modals/AlertModal';

export const MODAL_TYPES = {
  AlertModal: 'AlertModal',
} as const;

// 추후 타입 개편
const MODAL: any = {
  [MODAL_TYPES.AlertModal]: AlertModal,
};

const GlobalModal = () => {
  const {modalType, isActive, modalProps} = useAppSelector(
    state => state.modal,
  );
  const dispatch = useAppDispatch();

  if (!isActive) return null;

  const renderModal = () => {
    const ModalComponent = MODAL[modalType];

    return <ModalComponent {...modalProps}></ModalComponent>;
  };

  return <>{renderModal()}</>;
};

export default GlobalModal;
