import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

import BaseButton from '../buttons/BaseButton';
import useAlertModal from '../../hooks/useAlertModal';

const AlertModal = ({
  type,
  innerText = '',
  confirmText = '확인',
  closeText = '취소',
  handleConfirm,
  handleClose,
}) => {
  const {modalState, disableModal} = useAlertModal();

  const onConfirm = () => {
    if (handleConfirm) {
      handleConfirm();
    }
    disableModal();
  };
  const onClose = () => {
    if (handleClose) {
      handleClose();
    }
    disableModal();
  };

  return (
    <Modal transparent>
      <TouchableWithoutFeedback
        onPress={e => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.block}>
            <View style={styles.modalContent}>
              <Text style={styles.innerText}>{innerText}</Text>
            </View>
            <View style={styles.modalButtonBlock}>
              <BaseButton label={confirmText} onPress={onConfirm}></BaseButton>
              {type === 'Confirm' && (
                <BaseButton
                  label={closeText}
                  onPress={onClose}
                  secondary
                  style={styles.closeButton}></BaseButton>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  block: {
    flexGrow: 1,
    height: 160,
    marginHorizontal: 30,

    zIndex: 99,
    backgroundColor: '#FFFFFF',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerText: {
    textAlign: 'center',
  },
  modalButtonBlock: {
    height: 50,
    margin: 12,
    flexDirection: 'row',
  },
  closeButton: {
    marginLeft: 12,
  },
});
