/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppNav from './src/Navigater/Navigater';

const App: () => React$Node = () => {
  console.disableYellowBox = true;
  return <AppNav />;
};

export default App;
