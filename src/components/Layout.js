import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import NavFooter from './NavFooter';

const Layout = ({children}) => {
  return (
    <>
      <ScrollView style={styles.contentContainer}>{children}</ScrollView>
      <View>
        <NavFooter />
      </View>
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
