import {
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';

const DropdownModal = ({
  isOpened,
  handleIsOpened,
  handleSelection,
  items,
  frame,
  position = 'left',
}) => {
  const {width: windowWidth} = useWindowDimensions();
  const [modalPosition, setModalPosition] = useState();

  const DropdownItem = ({item, isSelected}) => {
    return (
      <TouchableOpacity
        style={styles.dropdownItem}
        onPress={() => {
          handleIsOpened(false);
          handleSelection(item);
        }}>
        <Text style={styles.itemLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  useLayoutEffect(() => {
    const frameRight = frame.x + frame.width;

    if (position === 'left') {
      setModalPosition({left: frame.x});
    } else if (position === 'right') {
      setModalPosition({right: windowWidth - frameRight});
    } else {
      setModalPosition({left: frame.x});
    }
  }, []);

  return (
    <Modal visible={isOpened} transparent>
      <TouchableWithoutFeedback
        onPress={() => {
          handleIsOpened(false);
        }}>
        <View style={styles.dropdownBackground}>
          <View
            style={[
              styles.dropdown,
              {
                top: frame.height + frame.y + 4,
              },
              modalPosition,
            ]}>
            <View>
              <FlatList
                data={items}
                renderItem={DropdownItem}
                keyExtractor={item => item.value}></FlatList>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DropdownModal;

const styles = StyleSheet.create({
  dropdownBackground: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',

    zIndex: 99,
    borderRadius: 8,

    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  dropdownItem: {
    height: 32,
    paddingHorizontal: 12,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    color: '#000000',
    textAlign: 'center',
  },
});
