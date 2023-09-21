import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

import Button from '@components/buttons/Button';
import useModal from '@hooks/useModal';

export interface ConfirmModalProps {
  innerText?: string;
  confirmText?: string;
}

const ConfirmModal = ({
  innerText = '',
  confirmText = '확인',
}: ConfirmModalProps) => {
  const {disableModal} = useModal();
  const onConfirm = () => {
    disableModal();
  };

  return (
    <Modal transparent>
      <TouchableWithoutFeedback
        onPress={e => {
          if (e.target === e.currentTarget) {
            onConfirm();
          }
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.block}>
            <View style={styles.modalContent}>
              <Text style={styles.innerText}>{innerText}</Text>
            </View>
            <View style={styles.modalButtonBlock}>
              <Button
                label={confirmText}
                onPress={onConfirm}
                secondary></Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmModal;

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
