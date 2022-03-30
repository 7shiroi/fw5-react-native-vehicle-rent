import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Layout from '../components/Layout';
import HomeHeader from '../components/HomeHeader';
import HomeSearch from '../components/HomeSearch';
import RecommendList from '../components/RecommendList';

const Home = () => {
  return (
    <Layout>
      <HomeHeader />
      <HomeSearch />
      <RecommendList />
    </Layout>
  );
};

export default Home;
