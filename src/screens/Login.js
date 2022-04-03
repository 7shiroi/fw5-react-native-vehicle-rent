import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../components/Container';
import globalStyle from '../assets/style';
import IconFA from 'react-native-vector-icons/FontAwesome';
import InputField from '../components/InputField';
import {LOGINBG} from '../assets/images';
import Button from '../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {loginAction} from '../redux/actions/auth';
import {useNavigation} from '@react-navigation/native';
import {COLOR_ACCENT, REGISTER_NAV, TOGGLE_LOADING} from '../helpers/utils';
import {useToast, Alert, Spinner} from 'native-base';

const Login = () => {
  const messages = useSelector(state => state.messages);
  const isLoading = useSelector(state => state.loading.isLoading);
  const toast = useToast();
  const navigate = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLogin = async () => {
    if (username.trim().length === 0) {
      toast.show({
        description: 'Username cannot be empty',
      });
    } else if (password.length === 0) {
      toast.show({
        description: 'Password cannot be empty',
      });
    } else {
      dispatch({type: TOGGLE_LOADING});
      await dispatch(loginAction(username, password));
      dispatch({type: TOGGLE_LOADING});
    }
  };
  return (
    <ImageBackground
      style={globalStyle.vh100}
      source={LOGINBG}
      imageStyle={globalStyle.darkenedBg}>
      <Container style={styles.container}>
        <View>
          <Text style={styles.titleText}>LET'S EXPLORE THE WORLD</Text>
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
              placeholder="Please enter username"
              name="username"
              onChangeText={setUsername}
            />
          </View>
          <View style={globalStyle.mb3}>
            <InputField
              placeholder="Please enter password"
              name="password"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>
          <View style={globalStyle.mb5}>
            <Text style={globalStyle.anchorUnderline}>Forgot Password?</Text>
          </View>
          <View style={globalStyle.mb3}>
            <Button color="#00ADB5" onPress={handleLogin}>
              {isLoading && <Spinner color={COLOR_ACCENT} size="lg" />}
              <Text style={styles.btnText}>Login</Text>
            </Button>
          </View>
          <View style={globalStyle.mb5}>
            <Button color="#222831">
              <IconFA name="google" size={20} />
              <View style={styles.gap} />
              <Text style={styles.btnText}>Login with Google</Text>
            </Button>
          </View>
          <View>
            <Text style={globalStyle.textCenter}>
              Don't have account?{' '}
              <TouchableOpacity
                onPress={() => {
                  navigate.push(REGISTER_NAV);
                }}>
                <Text style={globalStyle.anchorUnderline}>Sign up now</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </Container>
    </ImageBackground>
  );
};

export default Login;

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
});
