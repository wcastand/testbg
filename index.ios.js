/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  DeviceEventEmitter,
} from 'react-native';
import Beacons from 'react-native-beacons-manager';

const region = {
  identifier: 'demonstration',
  uuid: '97800498-F50E-4923-9813-65D3875331EC',
};

export default class testbg extends Component {
  constructor(props) {
    super(props);
    this.state = { beacons: [], detected: false };
  }
  componentWillMount() {
    Beacons.requestAlwaysAuthorization();

    Beacons.startRangingBeaconsInRegion(region);
    Beacons.startMonitoringForRegion(region);
    Beacons.startUpdatingLocation();
  }
  componentDidMount() {
    DeviceEventEmitter.addListener('regionDidEnter', data => {
      this.setState({ detected: true });
      Alert.alert('Enter', JSON.stringify(data));
    });
    DeviceEventEmitter.addListener('regionDidExit', data => {
      this.setState({ detected: true });
      Alert.alert('Exit', JSON.stringify(data));
    });
    DeviceEventEmitter.addListener('beaconsDidRange', data => {
      this.setState({ beacons: data.beacons });
    });
    Alert.alert('Device Ready', JSON.stringify(region));
  }
  componentWillUnmount() {
    Beacons.stopMonitoringForRegion();
    Beacons.stopRangingBeaconsInRegion();
    Beacons.stopUpdatingLocation();

    DeviceEventEmitter.removeListener('beaconsDidRange');
    DeviceEventEmitter.removeListener('regionDidEnter');
    DeviceEventEmitter.removeListener('regionDidExit');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! {this.state.beacons.length}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          {this.state.detected ? 'yes' : 'none'}
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

AppRegistry.registerComponent('testbg', () => testbg);
