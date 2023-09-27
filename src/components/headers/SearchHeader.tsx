import {StyleSheet, TextInput, useWindowDimensions} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Header from './Header';
import {MaterialIconButton} from '../buttons/IconButton';

export interface SearchHeaderProps {
  value: string;
  onChangeText: (t: string) => void;
}

const SearchHeader = ({value, onChangeText}: SearchHeaderProps) => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <Header
      leftButtons={
        <MaterialIconButton
          iconName="arrow-back"
          size={24}
          color="#000000"
          onPress={() => navigation.goBack()}></MaterialIconButton>
      }
      rightButtons={
        <MaterialIconButton
          iconName="close"
          size={24}
          color="#000000"
          onPress={() => onChangeText('')}></MaterialIconButton>
      }>
      <TextInput
        style={[styles.input, {width: width - 120}]}
        placeholder="검색하려는 내용을 검색해주세요."
        value={value}
        onChangeText={onChangeText}
        autoFocus></TextInput>
    </Header>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginHorizontal: 16,
  },
});
