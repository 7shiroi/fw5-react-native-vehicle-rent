import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NavFooter from './NavFooter';

const LayoutNoScroll = ({children}) => {
  return (
    <>
      <View style={styles.contentContainer}>{children}</View>
      <View>
        <NavFooter />
      </View>
    </>
  );
};

export default LayoutNoScroll;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
