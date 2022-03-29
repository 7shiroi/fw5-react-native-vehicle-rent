import {StyleSheet, View} from 'react-native';
import React from 'react';

const Container = ({children, style}) => {
  return <View style={[styles.containerMargin, style]}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  containerMargin: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 15,
  },
});
