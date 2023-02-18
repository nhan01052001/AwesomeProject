import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import HeaderComponent from '../navigations/HeaderComponent';
import { BASE_URL } from '../API/base_url';

export default class AddTask extends React.PureComponent {
  constructor(props) {
    super(props);

    this.refNameTask = React.createRef();
    this.state = {
      count: 0,
      nameTask: '',
      dateTask: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    let currentDate = new Date();
    let day =
      currentDate.getDate() < 10
        ? '0' + currentDate.getDate()
        : currentDate.getDate();
    let month =
      currentDate.getMonth() + 1 < 10
        ? '0' + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1;

    this.setState({
      count: this.props.route.params.countTasks + 1,
      dateTask:
        day +
        '-' +
        month.toString() +
        '-' +
        currentDate.getFullYear().toString(),
    });
  }

  handleAddTask = () => {
    this.setState({
      isLoading: true,
    });
    this.props.route.params.clearTasks();
    let currentDate = new Date();
    let day =
      currentDate.getDate() < 10
        ? '0' + currentDate.getDate()
        : currentDate.getDate();
    let month =
      currentDate.getMonth() + 1 < 10
        ? '0' + (currentDate.getMonth() + 1)
        : currentDate.getMonth() + 1;

    const data = {
      nameTask: this.state.nameTask,
      isComplete: false,
      dateTask: currentDate.getFullYear().toString() + '-' + month + '-' + day,
    };
    fetch('https://63eeef46c59531ccf166864a.mockapi.io/api/todo/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(task => {
        this.setState({
          count: this.state.count + 1,
          nameTask: '',
        });
        this.refNameTask.current.focus();
        this.setState({
          isLoading: false,
        });
        this.props.route.params.reLoadingListTasks();
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
        Alert.alert('Thêm không thành công');
      });
  };

  render() {
    console.log('re-render in add task');
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
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
                Trở về
              </Text>
            </TouchableOpacity>

            <ScrollView style={{ padding: 24, marginTop: 24 }}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    marginLeft: 6,
                    marginBottom: 6,
                  }}>
                  Số công việc
                </Text>
                <TextInput
                  value={this.state.count.toString()}
                  editable={false}
                  selectTextOnFocus={false}
                  onChangeText={text => {
                    this.setState({
                      count: text,
                    });
                  }}
                  style={{
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 10,
                    fontSize: 24,
                    color: 'red',
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    fontWeight: '700',
                  }}
                />
              </View>
              <View style={{ marginVertical: 24 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    marginLeft: 6,
                    marginBottom: 6,
                  }}>
                  Tên công việc
                </Text>
                <TextInput
                  value={this.state.nameTask}
                  ref={this.refNameTask}
                  selectTextOnFocus={false}
                  placeholder="Nhập tên công việc..."
                  onChangeText={text => {
                    this.setState({
                      nameTask: text,
                    });
                  }}
                  style={{
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 10,
                    fontSize: 24,
                    color: 'red',
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    fontWeight: '700',
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    marginLeft: 6,
                    marginBottom: 6,
                  }}>
                  Ngày nhận việc
                </Text>
                <TextInput
                  value={this.state.dateTask}
                  selectTextOnFocus={false}
                  editable={false}
                  onChangeText={text => {
                    this.setState({
                      dateTask: text,
                    });
                  }}
                  style={{
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 10,
                    fontSize: 24,
                    color: 'red',
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    fontWeight: '700',
                  }}
                />
              </View>

              <View
                style={{
                  alignItems: 'center',
                  marginTop: 24,
                }}>
                {this.state.isLoading ? (
                  <ActivityIndicator size="large" color="#00ff00" />
                ) : (
                  <TouchableOpacity
                    onPress={this.handleAddTask}
                    style={{
                      backgroundColor: '#4eac6d',
                      width: '30%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 8,
                      borderRadius: 4,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '500',
                      }}>
                      Thêm
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
});
