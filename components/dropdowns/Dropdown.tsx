import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';

import DropdownModal from '../modals/DropdownModal';

const BaseDropdown = ({
  items,
  selected,
  isOpened,
  handleSelection,
  handleIsOpened,
}) => {
  const dropdownButtonRef = useRef();

  const [dropdownButtonFrame, setDropdownButtonFrame] = useState();

  const onPressMainButton = () => {
    if (dropdownButtonRef.current && dropdownButtonRef.current.measure) {
      dropdownButtonRef.current.measure((fx, fy, width, height, x, y) => {
        setDropdownButtonFrame({width, height, x, y});
        handleIsOpened(!isOpened);
      });
    }
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
              handleSelection={handleSelection}
              items={items}
              frame={dropdownButtonFrame}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BaseDropdown;

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
