/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class FirstApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
         app首页!
        </Text>
        <Text style={styles.instructions}>
          晃动手机 调出设置按钮
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FirstApp', () => FirstApp);


const App = () => {
  return (
      <View>
        <TextInput placeholder="Hello" />
      </View>
  );
}

Alert.alert(
  'Alert Title',
  'My Alert Msg',
  [
    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]
)

// App registration and rendering
AppRegistry.registerComponent('FirstApp', () => App);
