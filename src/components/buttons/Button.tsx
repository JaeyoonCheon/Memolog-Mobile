import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

interface ButtonProps {
  style?: ViewStyle;
  label: string;
  onPress: () => void;
  secondary?: boolean;
}

interface ButtonStyleProps {
  style?: ViewStyle;
  secondary?: boolean;
}

const Button = ({style, label, onPress, secondary = false}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles({secondary}).block, style]}
      onPress={onPress}>
      <Text style={styles({secondary}).label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = (props: ButtonStyleProps) =>
  StyleSheet.create({
    block: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

      borderRadius: 5,
      backgroundColor: props.secondary ? '#FFFFFF' : '#22BCCE',
      borderWidth: props.secondary ? 1 : undefined,
      borderColor: props.secondary ? '#747878' : undefined,
    },
    label: {
      fontSize: 16,

      color: props.secondary ? '#000000' : '#FFFFFF',
    },
  });
