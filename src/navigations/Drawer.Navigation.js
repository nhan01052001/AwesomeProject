import * as React from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Main from '../screens/Main.Screen';
import Messaging from '../screens/Messaginf.Screen';
import Notify from '../screens/Notify.Screen';
import Setup from '../screens/Setup.Screen';
import AddTask from '../screens/AddTask';

class DrawerNavigator extends React.Component {
  render() {
    const Drawer = createDrawerNavigator();

    const CustomDrawer = props => (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              marginVertical: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../img/icon/trend-avatar-1.jpeg')}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              Nguyễn Thành Nhân
            </Text>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View style={{ borderTopColor: '#ccc', borderTopWidth: 2 }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginLeft: 24,
              flexDirection: 'row',
              paddingVertical: 12,
            }}>
            <Image source={require('../img/icon/logout.png')} />
            <Text style={{ fontSize: 16, fontWeight: '600' }}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return (
      <Drawer.Navigator
        initialRouteName="Main"
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="Main"
          component={Main}
          options={{
            header: () => null,
            headerTitle: 'Hihi',
            drawerIcon: ({ color }) => (
              <Image
                style={{ alignItems: 'center', justifyContent: 'center' }}
                source={require('../img/icon/home.png')}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Messaging"
          component={Messaging}
          options={{
            header: () => null,
            drawerIcon: ({ color }) => (
              <Image
                style={{ alignItems: 'center', justifyContent: 'center' }}
                source={require('../img/icon/messenger.png')}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Notify"
          component={Notify}
          options={{
            header: () => null,
            drawerIcon: ({ color }) => (
              <Image
                style={{ alignItems: 'center', justifyContent: 'center' }}
                source={require('../img/icon/notify.png')}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Setup"
          component={Setup}
          options={{
            header: () => null,
            drawerIcon: ({ color }) => (
              <Image
                style={{ alignItems: 'center', justifyContent: 'center' }}
                source={require('../img/icon/settings.png')}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default DrawerNavigator;
