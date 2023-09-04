import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconButtonProps {
  iconName: string;
  size: number;
  color: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

export const MaterialIconButton = ({
  onPress,
  iconName,
  size,
  color,
  containerStyle = {},
}: IconButtonProps) => {
  return (
    <TouchableOpacity style={[styles.block, containerStyle]} onPress={onPress}>
      <MaterialIcons name={iconName} size={size} color={color}></MaterialIcons>
    </TouchableOpacity>
  );
};

export const MaterialCommunityIconButton = ({
  onPress,
  iconName,
  size,
  color,
  containerStyle = {},
}: IconButtonProps) => {
  return (
    <TouchableOpacity style={[styles.block, containerStyle]} onPress={onPress}>
      <MaterialCommunityIcons
        name={iconName}
        size={size}
        color={color}></MaterialCommunityIcons>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  block: {},
});
