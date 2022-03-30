import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import globalStyle from '../assets/style';
import IconFA from 'react-native-vector-icons/FontAwesome';
import InputField from '../components/InputField';
import {LOGINBG} from '../assets/images';
import Button from '../components/Button';

const Login = () => {
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
          <View style={globalStyle.mb3}>
            <InputField
              placeholder="Please enter email"
              keyboardType="email-address"
              name="email"
            />
          </View>
          <View style={globalStyle.mb3}>
            <InputField
              placeholder="Please enter password"
              name="password"
              secureTextEntry={true}
            />
          </View>
          <View style={globalStyle.mb5}>
            <Text style={globalStyle.anchorUnderline}>Forgot Password?</Text>
          </View>
          <View style={globalStyle.mb3}>
            <Button color="#00ADB5">
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
              <Text style={globalStyle.anchorUnderline}>Sign up now</Text>
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
