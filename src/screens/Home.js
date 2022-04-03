import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../components/Layout';
import HomeHeader from '../components/HomeHeader';
import HomeSearch from '../components/HomeSearch';
import RecommendList from '../components/RecommendList';
import {useDispatch} from 'react-redux';
import {TOGGLE_LOADING} from '../helpers/utils';
import {getCategoriesAction} from '../redux/actions/categories';
import {getPopularVehiclesAction} from '../redux/actions/vehicles';

const Home = () => {
  const dispatch = useDispatch();
  const fetchData = async () => {
    dispatch({type: TOGGLE_LOADING});
    await dispatch(getCategoriesAction);
    await dispatch(getPopularVehiclesAction);
    dispatch({type: TOGGLE_LOADING});
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <HomeHeader />
      <HomeSearch />
      <RecommendList />
    </>
  );
};

export default Home;
