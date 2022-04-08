import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Alert, Center, FlatList, HStack, VStack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {TOGGLE_LOADING} from '../helpers/utils';
import {getHistoryAction} from '../redux/actions/history';
import HistoryCard from '../components/HistoryCard';

const History = () => {
  const history = useSelector(state => state.history);
  const messages = useSelector(state => state.messages.msg);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchData();
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({type: TOGGLE_LOADING});
    await dispatch(getHistoryAction(token));
    dispatch({type: TOGGLE_LOADING});
  };

  return (
    <VStack>
      <Center py={3}>
        <Text style={styles.titleText}>History Order</Text>
      </Center>
      {messages.includes('has been deleted') && (
        <Center mb={5}>
          <Alert>History data succesfully deleted!</Alert>
        </Center>
      )}
      <HStack justifyContent="space-between" mx={4} mb={5}>
        <View />
        <Text>A Week Ago</Text>
        <Text>Delete</Text>
      </HStack>
      <FlatList
        data={history.historiesData}
        keyExtractor={obj => obj.history_id}
        renderItem={obj => {
          return <HistoryCard data={obj.item} />;
        }}
      />
    </VStack>
  );
};

export default History;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
