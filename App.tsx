import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}