import React from 'react';

import {useAppDispatch} from '@redux/hooks';
import {ModalType, openModal, closeModal} from '@redux/modalSlice';

export default function useModal() {
  const dispatch = useAppDispatch();

  function enableModal({modalType, modalProps}: Omit<ModalType, 'isActive'>) {
    dispatch(openModal({modalType, modalProps}));
  }
  function disableModal() {
    console.log('disable');
    dispatch(closeModal());
  }

  return {
    enableModal,
    disableModal,
  };
}
