import {
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  useWindowDimensions,
  Platform,
  ListRenderItem,
  DimensionValue,
} from 'react-native';
import {FlexStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import React, {useState, useRef, useEffect, useLayoutEffect} from 'react';

import {DropdownFrame} from '@hooks/useDropdown';

export interface ItemType {
  label: string;
  value: string;
  action?: () => void;
}
interface DropdownModalProps {
  isOpened: boolean;
  handleIsOpened: (f: boolean) => void;
  selected: ItemType;
  handleSelected: (i: ItemType) => void;
  items: ItemType[];
  frame?: DropdownFrame;
}
interface frameType {
  left?: DimensionValue;
  right?: DimensionValue;
}

const DropdownModal = ({
  isOpened,
  handleIsOpened,
  selected,
  handleSelected,
  items,
  frame,
}: DropdownModalProps) => {
  const {width: windowWidth} = useWindowDimensions();
  const [modalPosition, setModalPosition] = useState<frameType>();

  const DropdownItem: ListRenderItem<ItemType> = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.dropdownItem}
        onPress={() => {
          if (item.action) {
            item.action();
          }
          handleIsOpened(false);
          handleSelected(item);
        }}>
        <Text style={styles.itemLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  useLayoutEffect(() => {
    if (!frame) return;
    console.log(frame);
    const frameRight = frame.x + frame.width;

    if (windowWidth >= frameRight) {
      setModalPosition({left: frame.pageX});
    } else {
      setModalPosition({right: windowWidth - frameRight});
    }
  }, [frame]);

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
              frame && {
                top: frame.pageY,
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
