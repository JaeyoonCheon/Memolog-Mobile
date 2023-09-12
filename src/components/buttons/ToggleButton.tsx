import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {MaterialCommunityIconButton} from './IconButton';

export interface ToggleItemType {
  label: string;
  value: string;
}

interface ToggleButtonProps {
  items: ToggleItemType[];
  selected: ToggleItemType;
  handleSelection: (i: any) => void;
  size: number;
  containerStyle?: ViewStyle;
}

const ToggleButton = ({
  items,
  selected,
  handleSelection,
  size = 24,
  containerStyle = {},
}: ToggleButtonProps) => {
  const opposite = items.filter(item => item.value !== selected.value)[0];

  return (
    <MaterialCommunityIconButton
      iconName={selected.label}
      color="#000000"
      size={size}
      containerStyle={containerStyle}
      onPress={() => handleSelection(opposite)}></MaterialCommunityIconButton>
  );
};

export default ToggleButton;
