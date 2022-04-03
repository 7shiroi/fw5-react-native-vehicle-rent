import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../assets/style';
import {PROFILE} from '../assets/images';
import {
  FormControl,
  Input,
  Radio,
  ScrollView,
  Stack,
  TextArea,
  useToast,
} from 'native-base';
import Button from '../components/Button';
import {COLOR_ACCENT, TOGGLE_LOADING} from '../helpers/utils';
import {useDispatch, useSelector} from 'react-redux';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {dateToString} from '../helpers/converter';
import {updateProfileAction} from '../redux/actions/auth';
import {emailValidation, phoneNumberValidation} from '../helpers/validator';

const UpdateProfile = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [address, setAdress] = useState('');
  const [gender, setGender] = useState(null);
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
    if (auth.userData) {
      setName(auth.userData.name);
      setEmail(auth.userData.email);
      setPhoneNumber(auth.userData.phone_number);
      if (auth.userData.birth_date) {
        setBirthDate(new Date(auth.userData.birth_date));
      }
      setAdress(auth.userData.address);
      setGender(auth.userData.gender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateProfile = async () => {
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
      const data = {
        name,
        email,
        phone_number: phoneNumber,
        birth_date: birthDate,
        address,
        gender,
      };

      dispatch({type: TOGGLE_LOADING});
      await dispatch(updateProfileAction(auth.token, data));
      dispatch({type: TOGGLE_LOADING});
    }
  };

  return (
    <ScrollView>
      <View style={[styles.header, globalStyles.mb4]}>
        <Image source={PROFILE} style={styles.profileImage} />
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
            value={dateChanged ? dateToString(birthDate) : ''}
            onFocus={handleShowDatePicker}
            mb={3}
          />
          <FormControl.Label>Delivery Address</FormControl.Label>
          <TextArea h={20} value={address} mb={5} onChangeText={setAdress} />
        </Stack>
      </FormControl>
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
