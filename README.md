# React Native Cashfree Payment Demo App

## Requirements

This app requires the following.

- Node CLI installed and configured.
- Npm/Yarn CLI installed and configured.
- React-native CLI installed and configured (OPTIONAL) .
- Android development environment and adb CLI installed (For Android app).
- Gradle installed and configured (For Android app).
- IOS development environment installed (For iOS app).



## Installation And Setup

- Go to the project folder Install the node dependencies.

  ```bash
  npm install
  ```

  or ( for yarn users )

  ```bash
  yarn install
  ```

- Go to the "ios" folder and install the pod dependencies.

  ```bash
  cd ios && pod deintegrate && pod install && cd ..
  ```



## Running the project

To Run a specific platform use the following

- ### Android

  ```bash
  npm run android
  ```

- ### iOS

  ```bash
  npm run ios
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