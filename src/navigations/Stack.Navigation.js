import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AddTask from '../screens/AddTask';
import DrawerNavigator from './Drawer.Navigation';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

class MainStackNavigator extends React.Component {
  render() {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    );
  }
}

class RootStackNavigator extends React.Component {
  render() {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name="MainStack"
          component={MainStackNavigator}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="AddTask"
          component={AddTask}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    );
  }
}

export { MainStackNavigator, RootStackNavigator };
