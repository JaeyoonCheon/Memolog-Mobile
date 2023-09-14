import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';

import DropdownModal, {ItemType} from '@components/modals/DropdownModal';
import useDropdown from '@hooks/useDropdown';

interface SelectProps {
  items: ItemType[];
}

const Select = ({items}: SelectProps) => {
  const {
    isOpened,
    handleIsOpened,
    selected,
    handleSelected,
    dropdownButtonRef,
    dropdownButtonFrame,
  } = useDropdown<ItemType>(items);

  const onPressMainButton = () => {
    handleIsOpened(!isOpened);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.block}
        ref={dropdownButtonRef}
        onPress={onPressMainButton}>
        <Text style={styles.mainLabel}>{selected.label}</Text>
        <View>
          {isOpened && (
            <DropdownModal
              isOpened={isOpened}
              handleIsOpened={handleIsOpened}
              selected={selected}
              handleSelected={handleSelected}
              items={items}
              frame={dropdownButtonFrame}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  block: {
    height: 32,
    paddingHorizontal: 12,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  mainLabel: {
    color: '#000000',
    textAlign: 'center',
  },
});
