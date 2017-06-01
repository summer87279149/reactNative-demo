import React, {Component} from 'react';
import Mock from 'mockjs'
import request from '../common/request.js'
import config from '../common/config.js'
import Detail from './detail.js'
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  ListView,
  TouchableHighlight,
  Button,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  AlertIOS,
  TouchableOpacity

} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

var {height, width} = Dimensions.get('window');
var cachedResults = {
  nextPage: 1,
  items: [],
  total: 0
}

class Item extends Component {
  constructor(props) {
    super(props);
    var row = this.props.row
    this.state = {
      up:row.voted,
      row: row,
      uri:row.video
    }

  }

  _up(){
    var up = !this.state.up
    this.setState({
      up:up
    })
    AlertIOS.alert(
      '点赞成功',
      '啊啊啊啊',
      [{text: '好的', onPress: () => console.log('Foo Pressed!')}]

    )
  }
  render() {
    var row = this.state.row
    return (
      <TouchableOpacity onPress={()=>this.props.xtpush({
              title: 'Detail',
              component: Detail,
              backButtonTitle: '哈哈',
              passProps:{data:this.state.uri}
            })}>

        <View style={styles.item}>
          <Text style={styles.title}>{row.title}</Text>

          <Image source={{
            uri: row.thumb
          }} style={styles.thumb}  >
            <Icon name="play" size={25} color="black" style={styles.play}  />
          </Image>

          <View style={styles.foot}>

            <View style={styles.handleBox}>
              <Icon name={this.state.up?'heart':'heart-o'} size={28} color="black"  style={[styles.up,!this.state.up?null:styles.down]} onPress={this._up.bind(this)}/>
              <Text style={styles.handleText} onPress={this._up.bind(this)}>喜欢</Text>
            </View>

            <View style={styles.handleBox}>
              <Icon name="heart-o" size={28} color="black" style={styles.commentIcon} />
              <Text style={styles.handleText} >评论</Text>
            </View>

          </View>

        </View>
      </TouchableOpacity>
    )

  }
}
export default class List extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      isRefreshing: false,
      isLoadingTail: false,
      dataSource: ds.cloneWithRows([])
    };

    this._fetchData = this._fetchData.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
    this._push=this._push.bind(this)
  }

  componentDidMount() {
    this._fetchData(1);
  }

  _fetchData(page) {
    var that = this;
    this.setState({isLoadingTail: true})
    request.get('http://rapapi.org/mockjs/19496/api/creations?token=2').then((data) => {
      if (page === 0) {
        cachedResults.items = [];
      }
      var items = cachedResults.items;
      cachedResults.items = items.concat(data.data);
      cachedResults.total = data.total;
      setTimeout(function() {
        that.setState({
          isLoadingTail: false,
          isRefreshing: false,
          dataSource: that.state.dataSource.cloneWithRows(cachedResults.items)
        })
      }, 100);
    })
  }

  fetchMoreData() {
    if (this._hasMore() && !this.state.isLoadingTail) {
      cachedResults.nextPage++;
      this._fetchData(cachedResults.nextPage);
    } else {
      return;
    }
  }

  _hasMore() {
    return cachedResults.items.length !== cachedResults.total
  }
  _renderfooter() {
    if (!this._hasMore.bind(this)) {
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      )
    }
    return (<ActivityIndicator animating={this.state.animating} style={[
      styles.centering, {
        height: 80
      }
    ]} size="large"/>);
  }

  _onRefresh() {
    console.log("刷新")
    if (this.state.isRefreshing) {
      return;
    }
    this.setState({isRefreshing: true});
    this._fetchData(0);
  }

  renderRow(row) {
    return (
      <Item row={row} key={row._id} xtpush={this._push}></Item>
    )
  }

  _push(vc) {
  console.log(1111111)
  this.props.navigator.push(vc);
  }
  render() {
    return (
      <View style={styles.container}>
          {/* { <View style={styles.header}>
            <Text style={styles.headerTitle}>列表页面</Text>
          </View> } */}
          < ListView dataSource={this.state.dataSource} refreshControl={< RefreshControl refreshing = {
            this.state.isRefreshing
          }
          onRefresh = {
            this._onRefresh.bind(this)
          }
          tintColor = "#ff6600" title = "拼命加载中..." />} renderFooter={this._renderfooter.bind(this)} renderRow={this.renderRow.bind(this)} onEndReached={this.fetchMoreData.bind(this)} onEndReachedThreshold={20} enableEmptySections={true} automaticallyAdjustContentInsets={true}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5fcff',
    flex: 1,
    paddingLeft: -10,
    marginLeft: -10,
    marginBottom: 44
  },
  commentIcon: {
    fontSize: 22,
    color: '#333'
  },
  handleText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  },
  handleBox: {
    padding: 10,
    flexDirection: 'row',
    width: width / 2 - 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  thumb: {
    width: width,
    height: width / 2,
    resizeMode: 'cover'
  },
  title: {
    padding: 10,
    fontSize: 18,
    color: "#333"
  },
  item: {
    width: width,
    margin: 10,
    backgroundColor: "#fff"
  },
  foot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#eee"
  },
  up: {
    fontSize: 22,
    color: '#333'
  },
  down:{
    fontSize: 22,
    color: '#ed7b66'
  },
  header: {
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },
  play: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 46,
    height: 46,
    paddingTop: 10,
    paddingLeft: 16,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23
  }
});
