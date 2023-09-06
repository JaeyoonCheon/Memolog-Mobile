import {createSlice} from '@reduxjs/toolkit';

import {MODAL_TYPES} from '../components/modals/GlobalModal';
import {AlertModalProps} from '../components/modals/AlertModal';

const name = 'modal';
const {AlertModal} = MODAL_TYPES;

export interface AlertModalType {
  modalType: typeof AlertModal;
  isActive: boolean;
  modalProps?: AlertModalProps;
}

export type ModalType = AlertModalType;

const initialState: ModalType = {
  modalType: 'AlertModal',
  isActive: false,
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
      state.modalProps = undefined;
      state.isActive = false;
    },
  },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;
