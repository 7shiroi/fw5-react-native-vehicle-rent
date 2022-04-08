import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HStack, Image, Modal, VStack, Button as ButtonNB} from 'native-base';
import {DUMMY1} from '../assets/images';
import {dateToString, stringToIdr} from '../helpers/converter';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import IconAD from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TOGGLE_LOADING} from '../helpers/utils';
import {deleteHistoryAction, getHistoryAction} from '../redux/actions/history';

const HistoryCard = ({data}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const handleDelete = async id => {
    dispatch({type: TOGGLE_LOADING});
    await dispatch(deleteHistoryAction(token, id));
    await dispatch(getHistoryAction(token));
    dispatch({type: TOGGLE_LOADING});
    setShowDeleteModal(false);
  };
  return (
    <HStack justifyContent="space-between" alignItems="center" mx={5} py={3}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageContainer}
          source={data.image ? {uri: data.image} : DUMMY1}
          alt={data.vehicle_name}
        />
      </View>
      <VStack>
        <Text style={styles.boldText}>{data.vehicle_name}</Text>
        <Text>
          {moment(data.date_start).format('MMM Do YYYY')} to{' '}
          {moment(data.date_end).format('MMM Do YYYY')}
        </Text>
        <Text style={styles.boldText}>
          {data.prepayment
            ? `Prepayment : Rp ${stringToIdr(data.prepayment)}`
            : 'No Prepayment'}
        </Text>
        <Text
          style={
            data.has_returned ? styles.hasReturnedText : styles.notReturnedText
          }>
          {data.has_returned ? 'Has been returned' : 'Not yet returned'}
        </Text>
      </VStack>
      <Pressable
        backgroundColor="red.200"
        onPress={() => setShowDeleteModal(true)}>
        <IconAD name="delete" size={20} />
      </Pressable>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body alignItems="center">
            <Text style={styles.deleteModalText}>Are you sure?</Text>
          </Modal.Body>
          <Modal.Footer>
            <ButtonNB
              mr={5}
              onPress={() => {
                setShowDeleteModal(false);
              }}>
              <Text>Close</Text>
            </ButtonNB>
            <ButtonNB onPress={() => handleDelete(data.history_id)}>
              <Text>Delete</Text>
            </ButtonNB>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </HStack>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 88,
  },
  boldText: {
    fontWeight: 'bold',
  },
  hasReturnedText: {
    color: 'green',
  },
  notReturnedText: {
    color: 'red',
  },
  deleteModalText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
