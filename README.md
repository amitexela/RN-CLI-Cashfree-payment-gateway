# React Native Sdk Demo App

This is a sample react native application demonstrating and utilizing Cashfree [react-native-pg-react-native-sdk](https://www.npmjs.com/package/react-native-pg-react-native-sdk).

## Requirements

This app requires the following.

- Node CLI installed and configured.
- Npm/Yarn CLI installed and configured.
- React-native CLI installed and configured (OPTIONAL) .
- Android development environment and adb CLI installed (For Android app).
- Gradle installed and configured (For Android app).
- IOS development environment installed (For iOS app).



## Installation And Setup

- Clone the github project using **zip file download** or using **git**.

  ```bash
  git clone https://github.com/cashfree/react-native-pgsdk-demo-app.git
  ```

- Go to the project folder Install the node dependencies.

  ```bash
  cd react-native-pgsdk-demo-app && npm install
  ```

  or ( for yarn users )

  ```bash
  cd react-native-pgsdk-demo-app && yarn install
  ```

- Go to the "ios" folder and install the pod dependencies.

  ```bash
  cd ios && pod deintegrate && pod install && cd ..
  ```



## Running the project

To Run a specific platform use the following

- ### Android

  ```bash
  npm react-native run-android
  ```

  or

  ```bash
  yarn react-native run-android
  ```

  or

  ```bash
  react-native run-android
  ```

- ### iOS

  ```bash
  npm react-native run-ios
  ```

  or

  ```bash
  yarn react-native run-ios
  ```

  or

  ```bash
  react-native run-ios
  ```



- ### Node server

  ```bash
  npm start
  ```

  or

  ```bash
  yarn start
  ```



## Clean the Build folders

Run the following commands to clean the build according to platforms.

- ### Android

  ```bash
  npm run clean-android
  ```

  or

  ```bash
  yarn run clean-android
  ```

- ### iOS

  ```bash
  npm run clean-ios
  ```

  or

  ```bash
  yarn run clean-ios
  ```