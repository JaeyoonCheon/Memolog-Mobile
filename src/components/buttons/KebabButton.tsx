import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DropdownModal, {ItemType} from '@components/modals/DropdownModal';
import useDropdown from '@hooks/useDropdown';

interface KebabButtonProps {
  items: ItemType[];
}

const KebabButton = ({items}: KebabButtonProps) => {
  const {
    isOpened,
    setIsOpened,
    selected,
    setSelected,
    dropdownButtonRef,
    dropdownButtonFrame,
  } = useDropdown<ItemType>(items);

  const onPressMainButton = () => {
    setIsOpened(!isOpened);
  };
  const onPressButton = (item: ItemType) => {
    setSelected(item);

    item.action();
  };

  return (
    <>
      <TouchableOpacity onPress={onPressMainButton} ref={dropdownButtonRef}>
        <MaterialIcons name={'more-vert'} size={24} color="#000000">
          {isOpened && (
            <DropdownModal
              isOpened={isOpened}
              handleIsOpened={setIsOpened}
              selected={selected}
              handleSelected={onPressButton}
              items={items}
              frame={dropdownButtonFrame}
            />
          )}
        </MaterialIcons>
      </TouchableOpacity>
    </>
  );
};

export default KebabButton;

const styles = StyleSheet.create({});
