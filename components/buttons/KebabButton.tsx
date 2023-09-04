import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {
  useState,
  useRef,
  forwardRef,
  MutableRefObject,
  RefObject,
} from 'react';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropdownModal from '../modals/DropdownModal';

interface KebabButtonItemProps {
  iconName: string;
  size: number;
  color: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}
interface KebabButtonProps {
  items: KebabButtonItemProps;
}

const KebabButton = ({items}: KebabButtonProps) => {
  const dropdownButtonRef = useRef();

  const {isOpened, handleSelection, handleIsOpened} = useSelect(items);

  const [dropdownButtonFrame, setDropdownButtonFrame] = useState();

  const MainButton = forwardRef(
    (
      {
        onPress,
        iconName,
        size,
        color,
        containerStyle = {},
      }: KebabButtonItemProps,
      ref,
    ) => (
      <TouchableOpacity
        style={[styles.block, containerStyle]}
        onPress={onPress}
        ref={ref}>
        <MaterialIcons
          name={iconName}
          size={size}
          color={color}></MaterialIcons>
      </TouchableOpacity>
    ),
  );
  const onPressMainButton = () => {
    if (dropdownButtonRef.current && dropdownButtonRef.current.measure) {
      dropdownButtonRef.current.measure((fx, fy, width, height, x, y) => {
        setDropdownButtonFrame({width, height, x, y});
        handleIsOpened(!isOpened);
      });
    }
  };
  const onPressButton = item => {
    handleSelection(item);

    item.action();
  };

  return (
    <>
      <MainButton
        iconName="more-vert"
        size={24}
        color="#000000"
        onPress={onPressMainButton}
        ref={dropdownButtonRef}></MainButton>
      {isOpened && (
        <DropdownModal
          isOpened={isOpened}
          handleIsOpened={handleIsOpened}
          handleSelection={onPressButton}
          items={items}
          frame={dropdownButtonFrame}
          position="right"
        />
      )}
    </>
  );
};

export default KebabButton;

const styles = StyleSheet.create({});
