import React, {useRef, useState} from 'react';
import {TouchableOpacity, LayoutChangeEvent} from 'react-native';

export interface DropdownFrame {
  width: number;
  height: number;
  x: number;
  y: number;
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

  const setLayout = (e: LayoutChangeEvent) => {
    if (parentRef.current) {
      parentRef.current.measure((x, y, width, height, pageX, pageY) => {
        setDropdownButtonFrame({
          width,
          height,
          x,
          y,
          pageX,
          pageY,
        });
      });
    }
  };

  return {
    selected,
    isOpened,
    handleSelected,
    handleIsOpened,
    setLayout,
    dropdownButtonRef: parentRef,
    dropdownButtonFrame,
  };
}

export default useDropdown;
