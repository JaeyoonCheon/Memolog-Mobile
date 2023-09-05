import React from 'react';

import {useAppDispatch} from '../redux/hooks';
import {ModalType, openModal, closeModal} from '../redux/ModalSlice';

export default function useModal() {
  const dispatch = useAppDispatch();

  function enableModal({modalType, isActive, modalProps}: ModalType) {
    dispatch(openModal({modalType, isActive, modalProps}));
  }
  function disableModal() {
    dispatch(closeModal());
  }

  return {
    enableModal,
    disableModal,
  };
}
