import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../components/Layout';
import HomeHeader from '../components/HomeHeader';
import HomeSearch from '../components/HomeSearch';
import RecommendList from '../components/RecommendList';

const Home = () => {
  return (
    <>
      <HomeHeader />
      <HomeSearch />
      <RecommendList />
    </>
  );
};

export default Home;
