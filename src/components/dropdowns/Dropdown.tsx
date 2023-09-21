import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import React, {useState, useRef} from 'react';

import DropdownModal, {ItemType} from '@components/modals/DropdownModal';
import {DropdownFrame} from '@/hooks/useDropdown';

export interface DropdownProps {
  items: ItemType[];
  isOpened: boolean;
  setIsOpened: (f: boolean) => void;
  selected: ItemType;
  setSelected: (i: ItemType) => void;
  setLayout: (e: LayoutChangeEvent) => void;
  dropdownButtonRef: React.LegacyRef<TouchableOpacity>;
  dropdownButtonFrame?: DropdownFrame;
}

const Dropdown = ({
  items,
  isOpened,
  setIsOpened,
  selected,
  setSelected,
  setLayout,
  dropdownButtonRef,
  dropdownButtonFrame,
}: DropdownProps) => {
  const onPressMainButton = () => {
    setIsOpened(!isOpened);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.block}
        ref={dropdownButtonRef}
        onLayout={setLayout}
        onPress={onPressMainButton}>
        <Text style={styles.mainLabel}>{selected.label}</Text>
        <View>
          {isOpened && (
            <DropdownModal
              isOpened={isOpened}
              handleIsOpened={setIsOpened}
              selected={selected}
              handleSelected={setSelected}
              items={items}
              frame={dropdownButtonFrame}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Dropdown;

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
