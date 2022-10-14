import React, {Component} from 'react';
import {Button, View, Text, Image, TouchableOpacity} from 'react-native';
import RNPgReactNativeSdk from 'react-native-pg-react-native-sdk';
import styles from './App.style';
import {startPayment} from './WEBCHECKOUT';

const WEB = 'WEB';
const UPI = 'UPI';
const BASE_RESPONSE_TEXT = 'Response or error will show here.';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      responseText: BASE_RESPONSE_TEXT,
      upiAppArray: [],
    };
  }

  componentDidMount() {
    this._getApps();
  }

  changeResponseText = (message) => {
    this.setState({
      responseText: message,
    });
  };

  changeUPIArray = (array) => {
    this.setState({
      upiAppArray: array,
    });
  };

  getFormattedIcon(appName, icon, id) {
    return (
      <TouchableOpacity
        key={id}
        style={styles.round_icon_buttons}
        onPress={() => this._startCheckout(UPI, id)}>
        <Image style={styles.upi_image} source={{uri: icon}} />
        <Text style={styles.upi_icons_text}> {appName} </Text>
      </TouchableOpacity>
    );
  }

  setApps(obj) {
    let array = [];
    obj.forEach(function (item) {
      console.log(item.id);
      let iconString = item.icon;
      let icon = RNPgReactNativeSdk.getIconString(iconString);
      let button = this.getFormattedIcon(item.displayName, icon, item.id);
      array.push(button);
    }, this);
    this.changeUPIArray(array);
  }

  // get all the UPI apps installed on the device
  _getApps() {
    RNPgReactNativeSdk.getUPIApps()
      .then((result) => {
        let obj = JSON.parse(result);
        this.setApps(obj);
      })
      .catch((error) => {
        this.changeUPIArray([
          <Text key="no_upi_error" style={styles.upi_app_not_found}>
            {' '}
            {error.message}{' '}
          </Text>,
        ]);
      });
  }

  async _startCheckout(mode, appName) {
    console.log('_startCheckout invoked ' + mode + '  ' + appName);

    let responseHandler = (result) => {
      this.changeResponseText(result);
      console.log(result);
      try {
        let output = '';
        JSON.parse(result, function (key, value) {
          if (key !== '') {
            output = output + key + ' : ' + value + '\n';
          }
          // Do something with the result
        });
        this.changeResponseText(output);
      } catch (error) {
        //
      }
    };

    try {
      this.changeResponseText(BASE_RESPONSE_TEXT);
      startPayment(mode, appName, responseHandler);
    } catch (error) {
      this.changeResponseText(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button onPress={() => this._startCheckout(WEB, null)} title={WEB} />
        </View>
        <View style={styles.button}>
          <Button onPress={() => this._startCheckout(UPI, null)} title={UPI} />
        </View>
        <View style={styles.upi_icon_containers}>{this.state.upiAppArray}</View>
        <Text style={styles.response_text}> {this.state.responseText} </Text>
      </View>
    );
  }
}
