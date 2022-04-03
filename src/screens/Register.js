import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Container from '../components/Container';
import {REGISTERBG} from '../assets/images';
import IconFA from 'react-native-vector-icons/FontAwesome';
import globalStyle from '../assets/style';
import {Alert, useToast} from 'native-base';
import {
  comparePassword,
  emailValidation,
  passwordValidation,
} from '../helpers/validator';
import {useDispatch, useSelector} from 'react-redux';
import {registerAction} from '../redux/actions/auth';
import {LOGIN_NAV, TOGGLE_LOADING} from '../helpers/utils';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toast = useToast();
  const isLoading = useSelector(state => state.loading.isLoading);
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const handleRegister = async () => {
    if (name.trim().length === 0) {
      toast.show({
        description: 'Name cannot be empty',
      });
    } else if (username.trim().length === 0) {
      toast.show({
        description: 'Username cannot be empty',
      });
    } else if (email.trim().length === 0) {
      toast.show({
        description: 'Email cannot be empty',
      });
    } else if (!emailValidation(email)) {
      toast.show({
        description: 'Invalid Email format!',
      });
    } else if (password.length === 0) {
      toast.show({
        description: 'Password cannot be empty',
      });
    } else if (!passwordValidation(password)) {
      toast.show({
        description:
          'Your password must include 1 uppercase, 1 lowercase, 1 number and at least 8 characters long',
      });
    } else if (confirmPassword.length === 0) {
      toast.show({
        description: 'Confirm Password cannot be empty',
      });
    } else if (!comparePassword(password, confirmPassword)) {
      toast.show({
        description: 'Password not same!',
      });
    } else {
      const data = {name, username, email, password, confirmPassword};
      dispatch({type: TOGGLE_LOADING});
      await dispatch(registerAction(data));
      dispatch({type: TOGGLE_LOADING});
    }
  };
  return (
    <ImageBackground
      style={globalStyle.vh100}
      source={REGISTERBG}
      imageStyle={globalStyle.darkenedBg}>
      {!messages.error &&
        messages.msg === 'Register successful' &&
        navigate.push(LOGIN_NAV)}
      <Container style={styles.container}>
        <View>
          <Text style={styles.titleText}>LET'S HAVE{'\n'}SOME RIDE</Text>
        </View>
        <View>
          {messages.error && (
            <View style={globalStyle.mb3}>
              <Alert colorScheme="danger">
                <Text>{messages.errorMsg}</Text>
              </Alert>
            </View>
          )}
          <View style={globalStyle.mb3}>
            <InputField
              placeholder="Please enter your name"
              name="name"
              onChangeText={setName}
            />
          </View>
          <View style={globalStyle.mb3}>
            <InputField
              placeholder="Please enter username"
              name="username"
              onChangeText={setUsername}
            />
          </View>
          <View style={globalStyle.mb3}>
            <InputField
              placeholder="Please enter email"
              keyboardType="email-address"
              name="email"
              onChangeText={setEmail}
            />
          </View>
          <View style={globalStyle.mb3}>
            <InputField
              type="password"
              placeholder="Please enter password"
              name="password"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>
          <View style={globalStyle.mb5}>
            <InputField
              type="password"
              placeholder="Please re-enter password"
              name="confirmPassword"
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
            />
          </View>
          <View style={globalStyle.mb3}>
            <Button color="#00ADB5" onPress={handleRegister}>
              <Text style={styles.btnText}>Sign Up</Text>
            </Button>
          </View>
          <View style={globalStyle.mb5}>
            <Button color="#222831">
              <IconFA name="google" size={20} />
              <View style={styles.gap} />
              <Text style={styles.btnText}>Sign Up with Google</Text>
            </Button>
          </View>
          <View>
            <Text style={globalStyle.textCenter}>
              Already have an account?{' '}
              <TouchableOpacity
                style={styles.alignCenter}
                onPress={() => {
                  navigate.push(LOGIN_NAV);
                }}>
                <Text style={globalStyle.anchorUnderline}>Login now</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </Container>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },

  gap: {
    width: 10,
  },

  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },

  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  alignCenter: {
    alignItems: 'center',
  },
});
