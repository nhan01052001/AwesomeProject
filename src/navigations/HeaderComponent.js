import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default class HeaderComponent extends React.Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 40,
          backgroundColor: '#fff',
          right: 0,
          left: 0,
          paddingVertical: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 24, fontWeight: '700', marginLeft: 24 }}>
          {this.props.title}
        </Text>
        <TouchableOpacity
          style={{ marginRight: 24 }}
          onPress={this.props.AddTask}>
          <Text style={{ fontSize: 24, fontWeight: '700' }}>Thêm</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
