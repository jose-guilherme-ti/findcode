import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import React, { Component } from 'react';
import Main from './src/components/Main';
import { name as appName } from './app.json';

export default class App extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Main />
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
  });
  


AppRegistry.registerComponent(appName, () => App);
