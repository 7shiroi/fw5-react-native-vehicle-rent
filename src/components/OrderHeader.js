import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../assets/style';
import {ORDERDUMMY} from '../assets/images';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconAD from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Box, Button, Image, Modal, Spinner} from 'native-base';
import {COLOR_ACCENT, COLOR_GREY, RESET_MESSAGE_STATE} from '../helpers/utils';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const OrderHeader = ({isFavorite = false, rating = 0}) => {
  const {detailData} = useSelector(state => state.vehicles);
  const role = useSelector(state => state.auth.userData.id_role);
  const isLoading = useSelector(state => state.loading.isLoading);
  const messages = useSelector(state => state.messages);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const handleDelete = () => {
    dispatch({type: RESET_MESSAGE_STATE});
    setShowModalConfirmDelete(false);
    setShowModalDelete(true);
  };
  return (
    <Box style={styles.container} position="relative">
      {detailData.image ? (
        <Image
          position="absolute"
          source={{uri: detailData.image}}
          alt="vehicle"
          w={Dimensions.get('window').width}
          h={Dimensions.get('window').height * 0.4}
        />
      ) : (
        <Box
          position="absolute"
          alignItems="center"
          justifyContent="center"
          backgroundColor={COLOR_GREY}
          w={Dimensions.get('window').width}
          h={Dimensions.get('window').height * 0.4}>
          <IconFA name="car" size={200} />
        </Box>
      )}
      <Box
        position="absolute"
        style={[styles.headerContainer, globalStyles.mx4, globalStyles.my5]}>
        <TouchableOpacity
          style={globalStyles.flex1}
          onPress={() => {
            navigate.goBack();
          }}>
          <IconFA name="chevron-left" size={20} />
        </TouchableOpacity>
        {role < 3 ? (
          <Pressable onPress={() => setShowModalConfirmDelete(true)}>
            <Box
              w={35}
              h={35}
              borderRadius={20}
              justifyContent="center"
              alignItems="center"
              backgroundColor={COLOR_ACCENT}>
              <IconAD name="delete" size={18} />
            </Box>
          </Pressable>
        ) : (
          <>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#00ADB5', '#006778']}
              style={[styles.rating, globalStyles.mx3]}>
              <Text style={styles.ratingText}>{rating}</Text>
            </LinearGradient>
            <IconAD
              name={isFavorite ? 'heart' : 'hearto'}
              color={isFavorite ? 'red' : 'white'}
              size={20}
            />
          </>
        )}
      </Box>
      <Modal
        isOpen={showModalConfirmDelete}
        onClose={() => {
          setShowModalConfirmDelete(false);
        }}>
        <Modal.Content maxWidth="400px">
          <Modal.Body alignItems="center">
            <Text style={styles.titleText}>Are you sure?</Text>
          </Modal.Body>

          <Modal.Footer>
            <Button
              mr={5}
              onPress={() => {
                setShowModalConfirmDelete(false);
              }}>
              <Text>Close</Text>
            </Button>
            <Button colorScheme="danger" onPress={handleDelete}>
              <Text>Delete</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal
        isOpen={showModalDelete}
        closeOnOverlayClick={false}
        onClose={() => setShowModalDelete(false)}>
        <Modal.Content maxWidth="400px">
          {isLoading && (
            <Modal.Body alignItems="center">
              <Text style={styles.titleText}>Please Wait</Text>
              <Spinner size="lg" />
            </Modal.Body>
          )}
          {!isLoading && messages.error && (
            <>
              <Modal.Body alignItems="center">
                <Text style={styles.titleText}>Delete data failed!</Text>
                <Text>{messages.errorMsg}</Text>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  onPress={() => {
                    setShowModalDelete(false);
                  }}>
                  <Text>Close</Text>
                </Button>
              </Modal.Footer>
            </>
          )}
          {!isLoading && !messages.error && (
            <>
              <Modal.Body alignItems="center">
                <Text style={styles.titleText}>Data successfully deleted!</Text>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  onPress={() => {
                    setShowModalDelete(false);
                  }}>
                  <Text>Close</Text>
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default OrderHeader;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.4,
  },
  bgImage: {
    width: Dimensions.get('window').width,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  rating: {
    width: 50,
    height: 24,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: 'bold',
  },
});
