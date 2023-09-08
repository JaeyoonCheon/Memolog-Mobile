import React from 'react';

import {useAppDispatch} from '@redux/hooks';
import {ModalType, openModal, closeModal} from '@redux/modalSlice';

export default function useModal() {
  const dispatch = useAppDispatch();

  function enableModal({modalType, isActive, modalProps}: ModalType) {
    dispatch(openModal({modalType, isActive, modalProps}));
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
