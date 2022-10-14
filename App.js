import * as React from 'react';
import { Component } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { CFPaymentGatewayService, } from 'react-native-cashfree-pg-sdk';
import { CFDropCheckoutPayment, CFEnvironment, CFPaymentComponentBuilder, CFPaymentModes, CFSession, CFThemeBuilder, } from 'cashfree-pg-api-contract';
import axios from 'axios';

const BASE_RESPONSE_TEXT = 'Response or error will show here.';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            responseText: BASE_RESPONSE_TEXT,
        };
    }
    onVerify(orderID) {
        this.changeResponseText('orderId is :' + orderID);
    }
    onError(error, orderID) {
        this.changeResponseText('exception is : ' + JSON.stringify(error) + '\norderId is :' + orderID);
    }
    componentDidMount() {
        console.log('MOUNTED');
        CFPaymentGatewayService.setCallback(this);
    }
    componentWillUnmount() {
        console.log('UNMOUNTED');
        CFPaymentGatewayService.removeCallback();
    }
    changeResponseText = (message) => {
        this.setState({
            responseText: message,
        });
    };
    async _startCheckout() {
        try {
          // -------------- this should be in backend
          var data = JSON.stringify({
            "customer_details": {
              "customer_id": "7112AAA812234",
              "customer_email": "johny@cashfree.com",
              "customer_phone": "9908734801"
            },
            "order_meta": {
              "notify_url": "https://webhook.site/0578a7fd-a0c0-4d47-956c-d02a061e36d3"
            },
            "order_amount": 1,
            "order_currency": "INR"
          });

          var config = {
            method: 'post',
            url: 'https://sandbox.cashfree.com/pg/orders',
            headers: { 
              'Accept': 'application/json', 
              'x-api-version': '2022-01-01', 
              'Content-Type': 'application/json', 
              'x-client-id': 'TEST2508600dd5e86f258119f5cc49068052', 
              'x-client-secret': 'TEST19a32a360b26b348f2bb1336acdadc42b25c00a'
            },
            data : data
          };
          // -------------- end
          const response = await axios(config);
          console.log('response', response.data.order_token, response.data.order_id);
            const session = new CFSession(
              response.data.order_token,
              response.data.order_id,
              CFEnvironment.SANDBOX
              );
            const paymentModes = new CFPaymentComponentBuilder()
                // .add(CFPaymentModes.CARD)
                .add(CFPaymentModes.UPI)
                // .add(CFPaymentModes.NB)
                // .add(CFPaymentModes.WALLET)
                // .add(CFPaymentModes.PAY_LATER)
                .build();
            const theme = new CFThemeBuilder()
                .setNavigationBarBackgroundColor('#E64A19')
                .setNavigationBarTextColor('#FFFFFF')
                .setButtonBackgroundColor('#FFC107')
                .setButtonTextColor('#FFFFFF')
                .setPrimaryTextColor('#212121')
                .setSecondaryTextColor('#757575')
                .build();
            const dropPayment = new CFDropCheckoutPayment(session, paymentModes, theme);
            CFPaymentGatewayService.doPayment(dropPayment);
        }
        catch (e) {
            console.log(e.message);
        }
    }
    render() {
        return (
          <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to React Native!</Text>
            <View style={styles.buttonContainer}>
              <Button title="Start Checkout" onPress={() => this._startCheckout()} />
            </View>
            <Text style={styles.instructions}>{this.state.responseText}</Text>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        padding: Platform.OS === 'ios' ? 56 : 24,
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
    },
    buttonContainer: {
        marginTop: 24,
        marginBottom: 24,
    },
    button: {
        color: '#61aafb',
        margin: 8,
        width: 200,
    },
    response_text: {
        margin: 16,
        fontSize: 14,
    },
});