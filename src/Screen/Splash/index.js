import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.replace('TabBottom');
    }, 1000);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#44F156',
        }}>
        <Image source={require('../../../images/logo-ship.png')} />
      </View>
    );
  }
}
