import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ScrollView,
  Select,
  Spinner,
  useToast,
  VStack,
} from 'native-base';
import BackHeader from '../../components/BackHeader';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import {
  COLOR_ACCENT,
  COLOR_GREY,
  COLOR_SECONDARY,
  HOME_NAV,
  RESET_MESSAGE_STATE,
  TOGGLE_LOADING,
} from '../../helpers/utils';
import {useDispatch, useSelector} from 'react-redux';
import QuantitySetter from '../../components/QuantitySetter';
import {checkPriceFormat} from '../../helpers/validator';
import {addVehicleAction} from '../../redux/actions/vehicles';
import RNFetchBlob from 'rn-fetch-blob';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const AddVehicle = () => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [color, setColor] = useState('');
  const [idCategory, setIdCategory] = useState(null);
  const [stock, setStock] = useState(1);
  const [capacity, setCapacity] = useState(1);
  const categories = useSelector(state => state.categories);
  const toast = useToast();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const isLoading = useSelector(state => state.loading.isLoading);
  const messages = useSelector(state => state.messages);
  const navigate = useNavigation();

  const handleSave = async () => {
    dispatch({type: RESET_MESSAGE_STATE});
    if (name.trim().length === 0) {
      toast.show({description: 'Name cannot be empty!'});
    } else if (price.trim().length === 0) {
      toast.show({description: 'Price cannot be empty!'});
    } else if (!checkPriceFormat(price.trim())) {
      toast.show({description: 'Invalid price format!'});
    } else if (location.trim().length === 0) {
      toast.show({description: 'Location cannot be empty!'});
    } else if (color.trim().length === 0) {
      toast.show({description: 'Color cannot be empty!'});
    } else if (idCategory < 1) {
      toast.show({description: 'Please select category!'});
    } else {
      const data = [
        {name: 'name', data: name},
        {name: 'id_category', data: String(idCategory)},
        {name: 'price', data: price},
        {name: 'color', data: color},
        {name: 'location', data: location},
        {name: 'stock', data: String(stock)},
        {name: 'capacity', data: String(capacity)},
      ];
      if (image) {
        data.push({
          name: 'image',
          filename: image.fileName,
          type: image.type,
          data: RNFetchBlob.wrap(image.uri),
        });
      }
      dispatch({type: TOGGLE_LOADING});
      setShowModal(true);
      await dispatch(addVehicleAction(token, data));
      dispatch({type: TOGGLE_LOADING});
    }
  };

  const handleUploadImage = async () => {
    try {
      const response = await launchImageLibrary({});
      if (response.didCancel) {
        return false;
      }
      setImage(response.assets[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const clearState = () => {
    setName('');
    setPrice('');
    setLocation('');
    setColor('');
    setIdCategory(null);
    setStock(1);
    setCapacity(1);
    setImage(null);
  };
  return (
    <ScrollView>
      <BackHeader>Add new item</BackHeader>
      <VStack mx={5}>
        <VStack alignItems="center" space={5}>
          <Box
            w={150}
            h={150}
            borderRadius={75}
            alignItems="center"
            justifyContent="center"
            backgroundColor={COLOR_GREY}>
            {image ? (
              <Image
                source={{uri: image.uri}}
                alt="product"
                w={150}
                h={150}
                borderRadius={75}
              />
            ) : (
              <IconMI name="add-a-photo" size={75} />
            )}
          </Box>
          <Button
            backgroundColor={COLOR_SECONDARY}
            px={10}
            py={3}
            onPress={handleUploadImage}>
            Add Pictures
          </Button>
          <Input
            textAlign="center"
            w="75%"
            variant="underlined"
            placeholder="Product name"
            value={name}
            onChangeText={setName}
          />
          <Input
            textAlign="center"
            w="75%"
            variant="underlined"
            placeholder="Product Price"
            keyboardType="decimal-pad"
            value={price}
            onChangeText={setPrice}
          />
        </VStack>
        <VStack space={5} mt={5}>
          <Box>
            <Text style={styles.titleText}>Location</Text>
            <Input
              w="100%"
              variant="underlined"
              placeholder="Product Location"
              value={location}
              onChangeText={setLocation}
            />
          </Box>
          <Box>
            <Text style={styles.titleText}>Color</Text>
            <Input
              w="100%"
              variant="underlined"
              placeholder="Product Color"
              value={color}
              onChangeText={setColor}
            />
          </Box>
          <Box>
            <Text style={styles.titleText}>Category</Text>
            <Select
              w="100%"
              mt={1}
              placeholder="Select Category"
              selectedValue={idCategory}
              onValueChange={setIdCategory}>
              {categories.categoriesData.map(obj => {
                return (
                  <Select.Item label={obj.name} value={obj.id} key={obj.id} />
                );
              })}
            </Select>
          </Box>
          <Box flexDirection="row" justifyContent="space-between">
            <Text style={styles.titleText}>Stock</Text>
            <QuantitySetter onChangeValue={setStock} />
          </Box>
          <Box flexDirection="row" justifyContent="space-between">
            <Text style={styles.titleText}>Capacity</Text>
            <QuantitySetter max={10} min={1} onChangeValue={setCapacity} />
          </Box>
          <Button mb={3} backgroundColor={COLOR_ACCENT} onPress={handleSave}>
            Save Product
          </Button>
        </VStack>
      </VStack>
      <Modal
        isOpen={showModal}
        closeOnOverlayClick={false}
        onClose={() => setShowModal(false)}>
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
                <Text style={styles.titleText}>Add data failed!</Text>
                <Text>{messages.errorMsg}</Text>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  <Text>Close</Text>
                </Button>
              </Modal.Footer>
            </>
          )}
          {!isLoading && !messages.error && (
            <>
              <Modal.Body alignItems="center">
                <Text style={styles.titleText}>Data successfully added!</Text>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  mr={5}
                  onPress={() => {
                    setShowModal(false);
                    navigate.push(HOME_NAV);
                  }}>
                  <Text>Home</Text>
                </Button>
                <Button
                  onPress={() => {
                    clearState();
                    setShowModal(false);
                  }}>
                  <Text>Add More</Text>
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
};

export default AddVehicle;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
