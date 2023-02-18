import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import React from 'react';

const MAX_PAN = 80;

export default class OneTask extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.isComplete != nextProps.isComplete ? true : false;
  }

  deleteSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          marginVertical: 10,
          //   paddingVertical: 15,
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <Animated.Image
          style={{
            // fontSize: 18,
            // fontWeight: 700,
            transform: [{ scale: scale }],
          }}
          source={require('../img/icon/trash-can.png')}
        />
      </TouchableOpacity>
    );
  };

  render() {
    console.log('re-render in One Task');
    const date = new Date(this.props.tasks.dateTask);

    return (
      <Swipeable renderLeftActions={this.deleteSwipe}>
        <TouchableOpacity
          //onPress={this.touchComplete.bind(this)}
          onPress={this.props.handleComplete}
          style={
            this.props.tasks.isComplete
              ? [styles.wrapTask, { backgroundColor: '#4eac6d' }]
              : styles.wrapTask
          }>
          <View style={{ paddingHorizontal: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
              Công việc: {this.props.tasks.nameTask}
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: '300', fontStyle: 'italic' }}>
              Ngày nhận: {date.getDate()}-{date.getMonth() + 1}-{' '}
              {date.getFullYear()}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  icon: {
    width: 24,
    height: 24,
  },

  wrapTask: {
    marginVertical: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    // Shadow for iOS
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
});
