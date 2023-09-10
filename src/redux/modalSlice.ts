import {createSlice} from '@reduxjs/toolkit';

import {MODAL_TYPES} from '@components/modals/GlobalModal';
import {AlertModalProps} from '@components/modals/AlertModal';
import {ConfirmModalProps} from '@/components/modals/ConfirmModal';

const name = 'modal';

export type ModalPropsType = AlertModalProps | ConfirmModalProps;
export interface ModalType {
  modalType: (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];
  isActive: boolean;
  modalProps: ModalPropsType;
}

const initialState: ModalType = {
  modalType: 'AlertModal',
  isActive: false,
  modalProps: {
    innerText: '',
    closeText: '취소',
    confirmText: '확인',
    handleClose: () => {},
    handleConfirm: () => {},
  },
};

const modalSlice = createSlice({
  name: name,
  initialState,
  reducers: {
    openModal: (state, action) => {
      const {modalType, modalProps} = action.payload;
      state.modalType = modalType;
      state.modalProps = modalProps;
      state.isActive = true;
    },
    closeModal: state => {
      state.modalProps = initialState.modalProps;
      state.isActive = false;
    },
  },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;
