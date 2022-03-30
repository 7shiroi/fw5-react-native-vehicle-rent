import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import InputField from './src/components/InputField';
import {LOGINBG} from './src/assets/images';
import Container from './src/components/Container';
import Button from './src/components/Button';
import globalStyle from './src/assets/style';
import IconFA from 'react-native-vector-icons/FontAwesome';
import HomeHeader from './src/components/HomeHeader';
import HomeSearch from './src/components/HomeSearch';
import NavFooter from './src/components/NavFooter';
import Layout from './src/components/Layout';
import RecommendList from './src/components/RecommendList';

const App = () => {
  return (
    <>
      <Layout>
        <HomeHeader />
        <HomeSearch />
        <RecommendList />
      </Layout>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },

  gap: {
    width: 10,
  },

  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },

  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
