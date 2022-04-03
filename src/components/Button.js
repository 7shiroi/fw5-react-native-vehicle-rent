import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Button = ({children, onPress, color, buttonStyle = null}) => {
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
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.btn, buttonStyle]}>{children}</View>
    </TouchableOpacity>
  );
};

export default Button;
