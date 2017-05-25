import React, {Component} from 'react';
import Mock from 'mockjs'
import request from '../common/request.js'
import config from '../common/config.js'
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
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

var {height, width} = Dimensions.get('window');
export default class List extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          "_id": "63000019900613253X",
          "thumb": "https://unsplash.it/200/100/?random",
          "title": "测试内容5y64",
          "video": "http://us.sinaimg.cn/001HTpwtjx06YSP79k0w05040100zcMt0k01.mp4?KID=unistore,video&ssig=Y0tjbIX7fv&Expires=1495687012"
        }, {
          "_id": "650000200407095652",
          "thumb": "https://unsplash.it/214/120/?random",
          "title": "测试内容5y64",
          "video": "http://us.sinaimg.cn/001HTpwtjx06YSP79k0w05040100zcMt0k01.mp4?KID=unistore,video&ssig=Y0tjbIX7fv&Expires=1495687012"
        }
      ])
    };
    this._fetchData = this._fetchData.bind(this)
  }
  componentDidMount() {
    console.log(11111);
    this._fetchData();
  }
  _fetchData() {
    request.get('http://rapapi.org/mockjs/19496/api/creations?token=2')
    .then((data)=>this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data.data)
    }))
  }

  onPressLearnMore() {}

  renderRow(row) {
    return (
      <TouchableHighlight >
        <View style={styles.item}>

          <Text style={styles.title}>{row.title}</Text>

          <Image source={{
            uri: row.thumb
          }} style={styles.thumb}>
            <Icon name="play" size={25} color="black" style={styles.play} onPress={this.onPressLearnMore.bind(this)}/>

          </Image>

          <View style={styles.foot}>
            <View style={styles.handleBox}>
              <Button onPress={this.onPressLearnMore.bind(this)} title="👍" color="#841584" style={styles.up}></Button>
              <Text style={styles.handleText}>喜欢</Text>
            </View>
            <View style={styles.handleBox}>

              <Button onPress={this.onPressLearnMore.bind(this)} title="✍️" color="#841584" style={styles.commentIcon}></Button>
              <Text style={styles.handleText}>评论</Text>
            </View>
          </View>

        </View>

      </TouchableHighlight>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表页面</Text>
        </View>
        < ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true} automaticallyAdjustContentInsets={false}/>
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
    marginBottom:44
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
