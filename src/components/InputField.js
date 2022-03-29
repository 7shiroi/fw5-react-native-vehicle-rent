import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';

const InputField = ({placeholder, keyboardType, name, ...props}) => {
  return (
    <TextInput
      style={styles.transparentInput}
      name={name}
      keyboardType={keyboardType}
      placeholder={placeholder}
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
