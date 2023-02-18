import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigations/Drawer.Navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  MainStackNavigator,
  RootStackNavigator,
} from './src/navigations/Stack.Navigation';
import Test from './src/screens/Test';
import Main from './src/screens/Main.Screen';

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
