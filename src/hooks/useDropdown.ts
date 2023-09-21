import React, {useRef, useState, useEffect} from 'react';
import {TouchableOpacity, DimensionValue} from 'react-native';

export interface DropdownFrame {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

function useDropdown<T>(elements: T[]) {
  const parentRef = useRef<TouchableOpacity>(null);
  const initSelected = elements[0];
  const [selected, setSelected] = useState(initSelected);
  const [isOpened, setIsOpened] = useState(false);
  const [dropdownButtonFrame, setDropdownButtonFrame] =
    useState<DropdownFrame>();

  const handleSelected = (item: T) => {
    setSelected(item);
  };
  const handleIsOpened = (flag: boolean) => {
    setIsOpened(flag);
  };

  if (parentRef.current) {
    parentRef.current.measure((x, y, width, height, pageX, pageY) => {
      setDropdownButtonFrame({
        width,
        height,
        pageX,
        pageY,
      });
    });
  }

  return {
    selected,
    isOpened,
    handleSelected,
    handleIsOpened,
    dropdownButtonRef: parentRef,
    dropdownButtonFrame,
  };
}

export default useDropdown;
