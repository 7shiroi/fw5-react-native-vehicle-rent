import {StyleSheet, TouchableHighlight, View} from 'react-native';
import React from 'react';

const Button = ({children, onPress, color}) => {
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: color,
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
    },
  });
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.btn}>{children}</View>
    </TouchableHighlight>
  );
};

export default Button;
