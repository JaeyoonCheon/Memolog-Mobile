import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface ButtonProps {
  style: any;
  text: string;
  onPress: () => {};
  secondary?: boolean;
}

interface ButtonStyleProps {
  secondary?: boolean;
}

const Button = ({style, text, onPress, secondary = false}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles({secondary}).block, style]}
      onPress={onPress}>
      <Text style={styles({secondary}).text}>{text}</Text>
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
    text: {
      fontSize: 16,

      color: props.secondary ? '#000000' : '#FFFFFF',
    },
  });
