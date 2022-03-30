import {StyleSheet, TouchableHighlight, View} from 'react-native';
import React from 'react';

const ButtonNav = ({children, onPress}) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.btn}>{children}</View>
    </TouchableHighlight>
  );
};

export default ButtonNav;

const styles = StyleSheet.create({});
