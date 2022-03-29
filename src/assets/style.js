import {StyleSheet, Dimensions} from 'react-native';

module.exports = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
  mb1: {
    marginBottom: 5,
  },
  mb2: {
    marginBottom: 10,
  },
  mb3: {
    marginBottom: 15,
  },
  mb4: {
    marginBottom: 20,
  },
  mb5: {
    marginBottom: 25,
  },
  vh100: {
    height: Dimensions.get('window').height,
  },
  anchorUnderline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  darkenedBg: {
    opacity: 0.4,
  },
});
