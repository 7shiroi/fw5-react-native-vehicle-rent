import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Layout from '../components/Layout';
import {DUMMY3} from '../assets/images';
import ItemCard from '../components/ItemCard';
import LayoutNoScroll from '../components/LayoutNoScroll';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDetailVehicle,
  getVehiclesAction,
  getNextVehiclesAction,
} from '../redux/actions/vehicles';
import {useNavigation} from '@react-navigation/native';
import {ORDER_NAV, TOGGLE_LOADING} from '../helpers/utils';
import FilterBar from '../components/FilterBar';
import {getHistoryAction} from '../redux/actions/history';

const Search = () => {
  const vehicles = useSelector(state => state.vehicles);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({type: TOGGLE_LOADING});
    await dispatch(getVehiclesAction(filter.options));
    dispatch({type: TOGGLE_LOADING});
  };

  const goToOrder = id => {
    fetchDetailData(id);
    navigate.push(ORDER_NAV);
  };

  const fetchDetailData = async id => {
    dispatch({type: TOGGLE_LOADING});
    await dispatch(getDetailVehicle(id));
    dispatch({type: TOGGLE_LOADING});
  };

  const handleGetNext = async () => {
    dispatch({type: TOGGLE_LOADING});
    await dispatch(getNextVehiclesAction(vehicles.pageInfo.next));
    dispatch({type: TOGGLE_LOADING});
  };

  return (
    <FlatList
      ListHeaderComponent={<FilterBar />}
      data={vehicles.vehiclesData}
      onEndReached={handleGetNext}
      onEndReachedThreshold={0.5}
      renderItem={obj => {
        return (
          <TouchableOpacity
            onPress={() => {
              goToOrder(obj.item.id);
            }}>
            <ItemCard data={obj.item} />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Search;

const styles = StyleSheet.create({});
