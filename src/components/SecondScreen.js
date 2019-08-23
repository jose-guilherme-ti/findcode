import React, { useState} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import arrowImg from '../images/left-arrow.png';

const SIZE = 40;

const SecondScreen = (props)=>{
  /*constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  
  }*/

    console.log(props.retorno.data[0].E_mail)
    const [isLoading, setIsloading] = useState(false);
    let growAnimated = new Animated.Value(0);

  function _onPress() {
    if (isLoading) return;
     
    //this.setState({isLoading: true});
    setIsloading(true);
    Animated.timing(growAnimated, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      Actions.pop();
    }, 500);
  }

 
    const changeScale = growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, SIZE],
    });

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={_onPress}
          style={styles.button}
          activeOpacity={1}>
          <Image style={styles.image} source={arrowImg} />
        </TouchableOpacity>
        <Animated.View
          style={[styles.circle, {transform: [{scale: changeScale}]}]}
        />
      </View>
    );
  
}

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
    borderRadius: 100,
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  circle: {
    height: SIZE,
    width: SIZE,
    marginTop: -SIZE,
    borderRadius: 100,
    backgroundColor: '#F035E0',
  },
  image: {
    width: 24,
    height: 24,
  },
});
