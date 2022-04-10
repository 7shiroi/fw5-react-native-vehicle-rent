import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, HStack} from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const QuantitySetter = ({
  initialValue = 1,
  min = 0,
  max = null,
  onChangeValue = () => {},
}) => {
  const [value, setValue] = useState(initialValue);

  const handleDecrement = () => {
    if (value > min) {
      setValue(value - 1);
    }
  };
  const handleIncrement = () => {
    if (!max) {
      setValue(value + 1);
    } else if (value < max) {
      setValue(value + 1);
    }
  };

  const handleChangeValue = () => {
    if (typeof onChangeValue === 'function') {
      onChangeValue(value);
    }
  };

  useEffect(() => {
    handleChangeValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <HStack alignItems="center" space={5}>
      <Pressable onPress={handleDecrement}>
        {({isPressed, isHovered}) => {
          return (
            <Box
              w={7}
              h={7}
              borderRadius={15}
              alignItems="center"
              justifyContent="center"
              backgroundColor={
                isPressed
                  ? 'primary.400'
                  : isHovered
                  ? 'primary.400'
                  : 'primary.300'
              }>
              <IconFA name="minus" size={16} />
            </Box>
          );
        }}
      </Pressable>
      <Text style={styles.valueText}>{value}</Text>
      <Pressable onPress={handleIncrement}>
        {({isPressed, isHovered}) => {
          return (
            <Box
              w={7}
              h={7}
              borderRadius={15}
              alignItems="center"
              justifyContent="center"
              backgroundColor={
                isPressed
                  ? 'primary.500'
                  : isHovered
                  ? 'primary.500'
                  : 'primary.400'
              }>
              <IconFA name="plus" size={16} />
            </Box>
          );
        }}
      </Pressable>
    </HStack>
  );
};

export default QuantitySetter;

const styles = StyleSheet.create({
  valueText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
