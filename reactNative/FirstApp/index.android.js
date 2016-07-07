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
  View,
  StatusBar,
  Navigator,
  Platform,
} from 'react-native';

import HomeView from "./app/Views/Home";
import AboutView from "./app/Views/About";


class FirstApp extends Component {
  constructor(props){
    super(props);
    this.state={
      tit:"app首页"
    };
  };
  render() {
    let defaultName = 'HomeView';
    let defaultComponent = HomeView;
    return (
      <Navigator
        initialRoute={{ name: defaultName, component: defaultComponent }}
        configureScene={(route) => {
          return Navigator.SceneConfigs.VerticalDownSwipeJump;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator} />
        }} />
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


