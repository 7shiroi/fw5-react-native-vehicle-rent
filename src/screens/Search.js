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
import {
  CLEAR_FILTER,
  ORDER_NAV,
  RESET_MESSAGE_STATE,
  TOGGLE_LOADING,
} from '../helpers/utils';
import FilterBar from '../components/FilterBar';
import {getHistoryAction} from '../redux/actions/history';
import {Box, Center, Flex, Pressable} from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';

const Search = () => {
  const vehicles = useSelector(state => state.vehicles);
  const messages = useSelector(state => state.messages);
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
    navigate.push(ORDER_NAV, {id});
  };

  const handleGetNext = async () => {
    if (vehicles.pageInfo.next) {
      dispatch({type: TOGGLE_LOADING});
      await dispatch(getNextVehiclesAction(vehicles.pageInfo.next));
      dispatch({type: TOGGLE_LOADING});
    }
  };

  const handleResetFilter = () => {
    dispatch({type: CLEAR_FILTER});
    dispatch({type: RESET_MESSAGE_STATE});
    fetchData();
  };

  return (
    <>
      {messages.error && (
        <Flex flex={1} justifyContent="center">
          <Center>
            <Text>Oooops! Data not found!</Text>
            <Pressable my={5} onPress={handleResetFilter}>
              {({isHovered, isPressed}) => {
                return (
                  <Box
                    width={75}
                    height={75}
                    borderRadius={35}
                    justifyContent="center"
                    alignItems="center"
                    bg={
                      isPressed
                        ? 'primary.600'
                        : isHovered
                        ? 'primary.600'
                        : 'primary.500'
                    }
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}>
                    <IconFA name="refresh" size={50} />
                  </Box>
                );
              }}
            </Pressable>
            <Text>Reset filter</Text>
          </Center>
        </Flex>
      )}
      {!messages.error && (
        <FlatList
          ListHeaderComponent={<FilterBar />}
          data={vehicles.vehiclesData}
          onEndReached={handleGetNext}
          onEndReachedThreshold={0.5}
          keyExtractor={obj => obj.id}
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
      )}
    </>
  );
};

export default Search;

const styles = StyleSheet.create({});
