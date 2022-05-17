import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../assets/style';
import {PROFILE} from '../assets/images';
import {
  Alert,
  Center,
  FormControl,
  Input,
  Radio,
  ScrollView,
  Stack,
  TextArea,
  useToast,
  Box,
} from 'native-base';
import Button from '../components/Button';
import {
  COLOR_ACCENT,
  COLOR_GREY,
  RESET_MESSAGE_STATE,
  TOGGLE_LOADING,
} from '../helpers/utils';
import {useDispatch, useSelector} from 'react-redux';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {dateToString} from '../helpers/converter';
import {getProfileAction, updateProfileAction} from '../redux/actions/auth';
import {emailValidation, phoneNumberValidation} from '../helpers/validator';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import IconFA from 'react-native-vector-icons/FontAwesome';

const UpdateProfile = () => {
  const auth = useSelector(state => state.auth);
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [address, setAdress] = useState('');
  const [gender, setGender] = useState(null);
  const [picture, setPicture] = useState(null);
  const [dateChanged, setDateChanged] = useState(false);
  const onBirthDateChange = (e, selectedDate) => {
    setBirthDate(selectedDate);
    setDateChanged(true);
  };
  const handleShowDatePicker = e => {
    e.preventDefault();
    DateTimePickerAndroid.open({
      value: birthDate,
      onChange: onBirthDateChange,
      mode: 'date',
    });
  };
  useEffect(() => {
    dispatch({type: RESET_MESSAGE_STATE});
    if (auth.userData) {
      setName(auth.userData.name);
      setEmail(auth.userData.email);
      setPhoneNumber(auth.userData.phone_number);
      if (auth.userData.birth_date) {
        setBirthDate(new Date(auth.userData.birth_date));
      }
      setAdress(auth.userData.address);
      setGender(auth.userData.gender);
      setPicture(auth.userData.picture);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateProfile = async () => {
    dispatch({type: RESET_MESSAGE_STATE});
    if (name.length === 0) {
      toast.show({
        description: 'Name cannot be empty',
      });
    } else if (email.length === 0) {
      toast.show({
        description: 'Email cannot be empty',
      });
    } else if (!emailValidation(email)) {
      toast.show({
        description: 'Invalid email format',
      });
    } else if (phoneNumber.length > 0 && !phoneNumberValidation(phoneNumber)) {
      toast.show({
        description: 'Invalid phone number format',
      });
    } else {
      const data = [
        {name: 'name', data: name},
        {name: 'email', data: email},
        {name: 'phone_number', data: phoneNumber},
        {name: 'birth_date', data: birthDate},
        {name: 'address', data: address},
        {name: 'gender', data: gender},
      ];

      dispatch({type: TOGGLE_LOADING});
      await dispatch(updateProfileAction(auth.token, data));
      dispatch({type: TOGGLE_LOADING});
    }
  };

  const handleUploadImage = async () => {
    dispatch({type: RESET_MESSAGE_STATE});
    try {
      const response = await launchImageLibrary({});
      if (response.didCancel) {
        return false;
      }
      dispatch({type: TOGGLE_LOADING});
      await dispatch(
        updateProfileAction(auth.token, [
          {
            name: 'picture',
            filename: response.assets[0].fileName,
            type: response.assets[0].type,
            data: RNFetchBlob.wrap(response.assets[0].uri),
          },
        ]),
      );
      dispatch({type: TOGGLE_LOADING});
      setPicture(response.assets[0].uri);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <View style={[styles.header, globalStyles.mb4]}>
        <Box
          w={100}
          h={100}
          borderRadius={100}
          my={5}
          backgroundColor="muted.200"
          justifyContent="center"
          alignItems="center">
          {auth.userData.picture ? (
            <Image
              source={{uri: auth.userData.picture}}
              style={[styles.profileImage, globalStyles.mb3]}
            />
          ) : (
            <IconFA name="user" size={70} />
          )}
        </Box>
        <Center mb={3}>
          <Button color={COLOR_ACCENT} onPress={handleUploadImage}>
            <Text style={[globalStyles.px3]}>Update Profile Picture</Text>
          </Button>
        </Center>
        <Radio.Group
          name="gender"
          accessibilityLabel="Gender"
          value={gender}
          onChange={nextValue => {
            setGender(nextValue);
          }}>
          <Stack direction="row" mt="3" space={15}>
            <Radio shadow={2} colorScheme="primary" value="male">
              Male
            </Radio>
            <Radio shadow={2} colorScheme="primary" value="female">
              Female
            </Radio>
          </Stack>
        </Radio.Group>
      </View>
      <FormControl flex={1}>
        <Stack mx={5}>
          <FormControl.Label>Name</FormControl.Label>
          <Input type="text" mb={3} value={name} onChangeText={setName} />
          <FormControl.Label>Email Address</FormControl.Label>
          <Input
            type="email"
            keyboardType="email-address"
            value={email}
            mb={3}
            onChangeText={setEmail}
          />
          <FormControl.Label>Phone Number</FormControl.Label>
          <Input
            type="text"
            keyboardType="phone-pad"
            value={phoneNumber}
            mb={3}
            onChangeText={setPhoneNumber}
          />
          <FormControl.Label>Date of Birth</FormControl.Label>
          <Input
            type="date"
            value={
              dateChanged || auth.userData.birth_date
                ? dateToString(birthDate)
                : ''
            }
            onFocus={handleShowDatePicker}
            mb={3}
          />
          <FormControl.Label>Delivery Address</FormControl.Label>
          <TextArea h={20} value={address} mb={5} onChangeText={setAdress} />
        </Stack>
      </FormControl>
      {messages.error && (
        <Alert mx={3}>
          <Text>{messages.errorMsg}</Text>
        </Alert>
      )}
      {messages.msg.includes('has been updated') && (
        <Alert mx={3}>
          <Text>Your profile has been updated!</Text>
        </Alert>
      )}
      <Button
        onPress={handleUpdateProfile}
        color={COLOR_ACCENT}
        buttonStyle={[globalStyles.py4, globalStyles.my2, globalStyles.mx3]}>
        <Text>Save Change</Text>
      </Button>
    </ScrollView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  gender: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
