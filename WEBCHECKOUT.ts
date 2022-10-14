import RNPgReactNativeSdk from "react-native-pg-react-native-sdk/bridge";


const UPI = "UPI";

export function startPayment(mode: string, appName: string, responseHandler) {
  let env = "TEST"; // "TEST" or "PROD"
  const checkout = new Map<string, string>();
  checkout.set("orderId", "123"); // orderId here
  checkout.set("orderAmount", "1.00"); // orderAmount here
  checkout.set("appId", "TEST250542a400350f0a9c76b46f1e245052"); // apiKey here
  checkout.set("tokenData", "TESTdad15cb654d7f3bba6449cc8907f2c50a5bf4e7d"); // cfToken here

  checkout.set("orderCurrency", "INR");
  checkout.set("orderNote", "Test Note");
  checkout.set("customerName", "Cashfree User");
  checkout.set("customerPhone", "7015734504");
  checkout.set("customerEmail", "cashfree@cashfree.com");
  checkout.set("hideOrderId", "true");
  checkout.set("color1", "#6002EE");
  checkout.set("color2", "#ffff1f");

  if (mode === UPI) {
    if (appName != null) {
      checkout.set("appName", appName);
    }
    RNPgReactNativeSdk.startPaymentUPI(checkout, env, responseHandler);
  } else {
    RNPgReactNativeSdk.startPaymentWEB(checkout, env, responseHandler);
  }
}
