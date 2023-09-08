import React from 'react';
import {View} from 'react-native';
import {configureStore, createSlice} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import GlobalModal from '@components/modals/GlobalModal';

const MockedState = {
  modalType: 'AlertModal',
  isActive: false,
  modalProps: {
    innerText: '경고!',
  },
};

const MockStore = ({modalState, children}) => (
  <Provider
    store={configureStore({
      reducer: {
        modal: createSlice({
          name: 'modal',
          initialState: modalState,
          reducers: {
            openModal: (state, action) => {
              const {modalType, modalProps} = action.payload;
              state.modalType = modalType;
              state.modalProps = modalProps;
              state.isActive = true;
            },
            closeModal: state => {
              state.isActive = false;
            },
          },
        }).reducer,
      },
      devTools: process.env.NODE_ENV !== 'production',
    })}>
    {children}
  </Provider>
);

const AlertModalMeta = {
  title: 'AlertModal',
  component: GlobalModal,
  argTypes: {
    handleConfirm: {action: 'pressed the AlertModal'},
    handleClose: {action: 'pressed the AlertModal'},
  },
  decorators: [
    Story => (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Story />
      </View>
    ),
  ],
  args: {
    innerText: 'AlertModal',
  },
};

export default AlertModalMeta;

export const Basic = {
  decorators: [
    story => <MockStore modalState={MockedState}>{story()}</MockStore>,
  ],
};

export const Toggle = {
  decorators: [
    story => (
      <MockStore modalState={{...MockedState, isActive: true}}>
        {story()}
      </MockStore>
    ),
  ],
};
