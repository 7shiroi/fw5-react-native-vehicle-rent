import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../components/Layout';
import HomeHeader from '../components/HomeHeader';
import HomeSearch from '../components/HomeSearch';
import RecommendList from '../components/RecommendList';
import {useDispatch, useSelector} from 'react-redux';
import {ADMIN_ADD_ITEMS, COLOR_PRIMARY, TOGGLE_LOADING} from '../helpers/utils';
import {getCategoriesAction} from '../redux/actions/categories';
import {getPopularVehiclesAction} from '../redux/actions/vehicles';
import {Box, Button, ScrollView} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
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
        <Box mx={5} my={5} backgroundColor={COLOR_PRIMARY}>
          <Button onPress={() => navigate.push(ADMIN_ADD_ITEMS)}>
            Add Item
          </Button>
        </Box>
      )}
    </ScrollView>
  );
};

export default Home;
