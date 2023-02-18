import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import React from 'react';

export default class Test extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hiiiii</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 12,
    // paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 24,
    height: 24,
  },
});
