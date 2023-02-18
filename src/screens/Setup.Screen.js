import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default class Setup extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Setup.Screen</Text>
      </View>
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
