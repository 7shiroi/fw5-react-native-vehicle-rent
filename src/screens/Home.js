import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../components/Layout';
import HomeHeader from '../components/HomeHeader';
import HomeSearch from '../components/HomeSearch';
import RecommendList from '../components/RecommendList';
import {useDispatch, useSelector} from 'react-redux';
import {TOGGLE_LOADING} from '../helpers/utils';
import {getCategoriesAction} from '../redux/actions/categories';
import {getPopularVehiclesAction} from '../redux/actions/vehicles';
import {Box, Button, ScrollView} from 'native-base';

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
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
    <ScrollView>
      <HomeHeader />
      <HomeSearch />
      <RecommendList />
      {auth.userData.id_role < 3 && (
        <Box mx={5} my={5}>
          <Button>Add Item</Button>
        </Box>
      )}
    </ScrollView>
  );
};

export default Home;
