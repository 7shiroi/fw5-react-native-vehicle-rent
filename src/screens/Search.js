import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../components/Layout';
import {DUMMY3} from '../assets/images';
import ItemCard from '../components/ItemCard';
import LayoutNoScroll from '../components/LayoutNoScroll';
import {useDispatch, useSelector} from 'react-redux';
import {getVehiclesAction} from '../redux/actions/vehicles';
import {useNavigation} from '@react-navigation/native';
import {TOGGLE_LOADING} from '../helpers/utils';

const Search = () => {
  const vehicles = useSelector(state => state.vehicles);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({type: TOGGLE_LOADING});
    await dispatch(getVehiclesAction);
    dispatch({type: TOGGLE_LOADING});
  };

  return (
    <FlatList
      data={vehicles.vehiclesData}
      renderItem={obj => <ItemCard data={obj.item} />}
    />
  );
};

export default Search;

const styles = StyleSheet.create({});
