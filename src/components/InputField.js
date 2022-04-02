import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';

const InputField = ({
  placeholder,
  keyboardType = 'default',
  name,
  value = null,
  style = '',
  ...props
}) => {
  return (
    <TextInput
      style={[styles.transparentInput, style]}
      name={name}
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={value}
      {...props}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  transparentInput: {
    backgroundColor: 'rgba(223, 223, 223, .5)',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
