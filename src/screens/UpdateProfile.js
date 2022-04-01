import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '../assets/style';
import {PROFILE} from '../assets/images';
import {
  FormControl,
  Input,
  Radio,
  ScrollView,
  Stack,
  TextArea,
} from 'native-base';
import Button from '../components/Button';
import {COLOR_ACCENT} from '../helpers/utils';

const UpdateProfile = () => {
  const [gender, setGender] = useState(null);

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
          <Input type="text" defaultValue="user name" mb={3} />
          <FormControl.Label>Email Address</FormControl.Label>
          <Input type="email" defaultValue="user@mail.com" mb={3} />
          <FormControl.Label>Phone Number</FormControl.Label>
          <Input type="text" defaultValue="+6284912318" mb={3} />
          <FormControl.Label>Date of Birth</FormControl.Label>
          <Input type="date" defaultValue="date" mb={3} />
          <FormControl.Label>Delivery Address</FormControl.Label>
          <TextArea h={20} defaultValue="user deliver address" mb={5} />
        </Stack>
      </FormControl>
      <Button
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
