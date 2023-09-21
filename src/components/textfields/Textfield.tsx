import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

interface TextField {
  label: string;
  indicator?: string;
  onChange: (text: string) => void;
  value: string;
  isPassword?: boolean;
}

const TextField = ({
  label = '',
  indicator = '',
  onChange,
  value = '',
  isPassword = false,
}: TextField) => {
  return (
    <View style={styles.block}>
      <View style={styles.labelBlock}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        secureTextEntry={isPassword}></TextInput>
      <Text style={styles.indicator}>{indicator}</Text>
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  block: {},
  labelBlock: {
    alignSelf: 'flex-start',
    paddingHorizontal: 4,

    backgroundColor: '#FFFFFF',
    zIndex: 1,

    transform: [
      {
        translateY: 10,
      },
      {
        translateX: 8,
      },
    ],
  },
  label: {
    fontSize: 12,
  },
  input: {
    height: 60,
    paddingHorizontal: 16,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#79747E',
  },
  indicator: {
    lineHeight: 16,

    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: 'blue',
  },
});
