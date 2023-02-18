import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

import OneTask from '../components/OneTask';
import HeaderComponent from '../navigations/HeaderComponent';
import { BASE_URL } from '../API/base_url';

const DATA = [
  {
    id: 1,
    task: 'code 1',
    isComplete: false,
    date: new Date('2023-02-13'),
  },
  {
    id: 2,
    task: 'code 2',
    isComplete: true,
    date: new Date('2023-02-12'),
  },
  {
    id: 3,
    task: 'code 3',
    isComplete: false,
    date: new Date('2023-02-11'),
  },
  {
    id: 4,
    task: 'code 4',
    isComplete: false,
    date: new Date('2023-02-10'),
  },
  {
    id: 5,
    task: 'code 5',
    isComplete: false,
    date: new Date('2023-02-09'),
  },
  {
    id: 6,
    task: 'code 6',
    isComplete: false,
    date: new Date('2023-02-08'),
  },
  {
    id: 7,
    task: 'code 7',
    isComplete: true,
    date: new Date('2023-02-07'),
  },
  {
    id: 8,
    task: 'code 8',
    isComplete: false,
    date: new Date('2023-02-06'),
  },
  {
    id: 9,
    task: 'code 9',
    isComplete: false,
    date: new Date('2023-02-05'),
  },
];

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lsTasks: [],
      isLoader: false,
      isModalLoading: false,
      isRefresh: false,
      countTasks: 0,
      isLoadingFooter: false,
      isCallLoadFooter: false,
      totalPages: 0,
      pageDefault: 1,
      blockRender: false,
    };
  }

  getTask() {
    return new Promise((resolve, reject) => {
      resolve(DATA);
    });
  }

  getAllTask = () => {
    fetch(BASE_URL, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(tasks => {
        this.setState({
          countTasks: tasks.length,
        });
      })
      .catch(error => {});
  };

  loadingListTasks = (page = 1) => {
    const baseURL = new URL(BASE_URL);
    baseURL.searchParams.append('completed', false);
    baseURL.searchParams.append('limit', 10);
    baseURL.searchParams.append('page', page);

    baseURL.searchParams.append('sortBy', 'createdAt');
    baseURL.searchParams.append('order', 'desc');

    this.setState({
      isModalLoading: true,
      isRefresh: true,
    });
    fetch(baseURL)
      .then(res => res.json())
      .then(data => {
        this.setState({
          lsTasks: [...this.state.lsTasks, ...data],
        });
        this.setState({
          isModalLoading: false,
          isRefresh: false,
          isLoadingFooter: false,
        });
      })
      .catch(err => {
        Alert.alert('Mất kế nối mạng');
        this.setState({
          isModalLoading: true,
          isRefresh: false,
        });
      });
  };

  componentDidMount() {
    this.getAllTask();

    this.loadingListTasks();
  }

  debugger;
  taskComplete(item) {
    let index = this.state.lsTasks.findIndex(task => task.id === item.id);

    this.state.lsTasks[index].isComplete = !this.state.lsTasks[index]
      .isComplete;
    this.setState({
      lsTasks: this.state.lsTasks,
    });

    fetch(
      `https://63eeef46c59531ccf166864a.mockapi.io/api/todo/tasks/${item.id}`,
      {
        method: 'PUT', // or PATCH
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ isComplete: !item.isComplete }),
      },
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then(task => {
        console.log('Cập nhật thành công!');
      })
      .catch(error => {
        // handle error
      });
  }

  handleDelete(item) {
    Alert.alert(`Bạn có chắc là muốn xoá công việc không?`, '', [
      {
        text: 'Không xoá',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Xoá',
        onPress: () => {
          this.setState({
            isModalLoading: true,
          });
          fetch(
            `https://63eeef46c59531ccf166864a.mockapi.io/api/todo/tasks/${
              item.id
            }`,
            {
              method: 'DELETE',
            },
          )
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              // handle error
            })
            .then(task => {
              console.log('Xoá thành công!');
              this.setState({
                isModalLoading: false,
              });
            })
            .catch(error => {
              Alert.alert('Xoá không thành công!');
              this.setState({
                isModalLoading: false,
              });
            });

          // reset list tasks
          let arr = this.state.lsTasks.filter(obj => obj.id !== item.id);
          this.setState({
            lsTasks: [...arr],
          });
        },
      },
    ]);
  }

  touchComplete(item) {
    for (let i; i <= this.state.lsTasks.length; i++) {
      if (this.state.lsTasks[i].id === item.id) {
      }
    }
  }

  loadMore = () => {
    // this.setState({
    //   isLoadingFooter: true,
    // });
    let pages = this.state.countTasks / 10;
    let page;
    if (this.state.countTasks % 10 === 0) {
      page = Math.floor(pages);
    } else {
      page = Math.floor(pages) + 1;
    }
    if (this.state.pageDefault < page) {
      this.loadingListTasks(Number(this.state.pageDefault) + 1);
      this.setState({
        pageDefault: this.state.pageDefault + 1,
        // blockRender: true,
        // isLoadingFooter: false,
        isCallLoadFooter: false,
      });
    } else {
      this.setState({
        isLoadingFooter: false,
      });
    }
    this.setState({
      isLoadingFooter: false,
    });
  };

  clearList = () => {
    this.setState({
      lsTasks: [],
    });
  };

  render() {
    console.log('re-render in main');
    return (
      <View style={styles.container}>
        <HeaderComponent
          title="Main"
          AddTask={() =>
            this.props.navigation.navigate('AddTask', {
              lsTask: this.state.lsTasks,
              reLoadingListTasks: this.loadingListTasks,
              countTasks: this.state.countTasks,
              clearTasks: this.clearList,
            })
          }
        />

        <FlatList
          data={this.state.lsTasks}
          refreshing={this.state.isRefresh}
          onRefresh={() => this.loadingListTasks}
          style={{ marginVertical: 24 }}
          keyExtractor={item => item.id}
          ListFooterComponent={
            this.state.isLoadingFooter ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : null
          }
          onMomentumScrollEnd={() => {
            this.setState({
              isLoadingFooter: true,
            });
            if (this.state.isCallLoadFooter) {
              this.loadMore();
            }
          }}
          onEndReached={() => {
            this.setState({
              isCallLoadFooter: true,
            });
          }}
          onEndReachedThreshold={0}
          renderItem={({ item }) => (
            <OneTask
              // key={item.id}
              tasks={item}
              isComplete={item.isComplete}
              onPress={() => this.handleDelete(item)}
              handleComplete={() => this.taskComplete(item)}
            />
          )}
        />

        {/* modal loading */}
        <View>
          <Modal
            isVisible={this.state.isModalLoading}
            onBackdropPress={() =>
              this.setState({
                isModalLoading: false,
              })
            }
            style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 80,
  },

  icon: {
    width: 24,
    height: 24,
  },
});
