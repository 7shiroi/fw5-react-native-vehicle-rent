import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React from 'react';
import InputField from './src/components/InputField';
import {LOGINBG} from './src/assets/images';
import Container from './src/components/Container';
import Button from './src/components/Button';
import globalStyle from './src/assets/style';
import IconFA from 'react-native-vector-icons/FontAwesome';

const App = () => {
  return (
    <ImageBackground
      style={globalStyle.vh100}
      source={LOGINBG}
      imageStyle={globalStyle.darkenedBg}>
      <Container style={styles.container}>
        <View>
          <Text style={styles.titleText}>LET'S HAVE{'\n'}SOME RIDE</Text>
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
              placeholder="Please enter phone number"
              keyboardType="phone-pad"
              name="phoneNumber"
            />
          </View>
          <View style={globalStyle.mb3}>
            <InputField
              type="password"
              placeholder="Please enter password"
              name="password"
              secureTextEntry={true}
            />
          </View>
          <View style={globalStyle.mb5}>
            <InputField
              type="password"
              placeholder="Please re-enter password"
              name="confirmPassword"
              secureTextEntry={true}
            />
          </View>
          <View style={globalStyle.mb3}>
            <Button color="#00ADB5">
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
              <Text style={globalStyle.anchorUnderline}>Login now</Text>
            </Text>
          </View>
        </View>
      </Container>
    </ImageBackground>
  );
};

export default App;

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
