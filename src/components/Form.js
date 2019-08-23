import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Text,
  Easing
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';

import { Actions, ActionConst } from 'react-native-router-flux';

import spinner from '../images/loading.gif';

import api from '../services/api';

import md5 from 'md5';

const Form = (props) => {
  /* constructor(props) {
     super(props);
     this.state = {
       showPass: true,
       press: false,
     };
     this.showPass = this.showPass.bind(this);
   }
 */
  const [showPass, setShowPass] = useState(true);
  const [press, setPress] = useState(false);
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsloading] = useState(false);
  this.buttonAnimated = new Animated.Value(0);
  this.growAnimated = new Animated.Value(0);
  //this._onPress = this._onPress.bind(this);


  useEffect(() => {
    console.log(login);

  }, [login])

  function ShowPass() {
    if (press === false) {
      setShowPass(false);
      setPress(true);
    } else {
      setShowPass(true);
      setPress(false);
    }
  }

 

  async function _onPress() {
    if (login != "" && senha != "") {
      if (isLoading) return;


      const retorno = await api.post('/login_app_mobile', {
        login: login,
        senha: md5(senha)
      });

      

      //this.setState({ isLoading: true });
      setIsloading(true);
      Animated.timing(this.buttonAnimated, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
      }).start();

      setTimeout(() => {
        _onGrow();
      }, 2000);

      setTimeout(() => {
        Actions.secondScreen({retorno});
        //this.setState({ isLoading: false });
        setIsloading(false);
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      }, 2300);
    }else{
      alert('Preencha todos os campos!');
    }
  }


  function _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }


  const changeWidth = this.buttonAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
  });
  const changeScale = this.growAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [1, MARGIN],
  });






  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
      <View style={styles.inputWrapper}>
        <Image source={usernameImg} style={styles.inlineImg} />
        <TextInput
          style={styles.input}
          placeholder="Cliente"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText={login => setLogin(login)}
          value={login}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Image source={passwordImg} style={styles.inlineImg} />
        <TextInput
          style={styles.input}
          secureTextEntry={showPass}
          placeholder="Senha"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={senha => setSenha(senha)}
          value={senha}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnEye}
        onPress={() => ShowPass()}>
        <Image source={eyeImg} style={styles.iconEye} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Animated.View style={{ width: changeWidth }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => _onPress()}
            activeOpacity={1}>
            {isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
                <Text style={styles.text}>LOGIN</Text>
              )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, { transform: [{ scale: changeScale }] }]}
          />
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );

}

export default Form;



const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
  inputWrapper: {
    flex: 1,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});
