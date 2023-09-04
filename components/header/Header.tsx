import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface HeaderProps {
  children?: JSX.Element;
  leftButtons?: JSX.Element;
  title?: string;
  rightButtons?: JSX.Element;
}

const Header = ({children, leftButtons, title, rightButtons}: HeaderProps) => {
  return (
    <View style={styles.block}>
      {leftButtons && <View style={styles.left}>{leftButtons}</View>}
      <View style={styles.centerBlock}>
        {children || (
          <Text style={[styles.title, leftButtons && styles.titleLeft]}>
            {title}
          </Text>
        )}
      </View>
      {rightButtons && <View style={styles.right}>{rightButtons}</View>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  block: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,

    backgroundColor: '#FFFFFF',
  },
  centerBlock: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#000000',
  },
  titleLeft: {
    marginLeft: 16,
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    flexDirection: 'row',
  },
});
