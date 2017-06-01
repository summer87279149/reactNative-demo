
import React, { Component } from 'react';
import Video from 'react-native-video'
import request from '../common/request.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  ListView,
  Image,
  TextInput,
  Modal,
  TouchableHighlight
} from 'react-native';
var width = Dimensions.get('window').width
class Detail extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    var data = this.props.data;
    this.state = {
      modalVisible:false,
      text:'',
      data:data,
      muted:false,
      videoReady:false,
      videoProgress:0,
      videoTotal:0,
      videoCurrentTime:0,
      dataSource: ds.cloneWithRows([]),
      comments:[]
    };
    this.renderRow=this.renderRow.bind(this)
    this._fetchData=this._fetchData.bind(this);
    this.close=this.close.bind(this);
    this._focus=this._focus.bind(this);
  }

  componentDidMount(){
    this._fetchData()
  }

  _fetchData(){
    var that = this
    request.get('http://rapapi.org/mockjs/19496/comments',{
      token:2
    }).then(function(data){
      that.setState({
        comments:data.data,
        dataSource:that.state.dataSource.cloneWithRows(data.data)
      })
    })
  }

  renderRow(row){
    return(
      <View  style={styles.replyBox}>
        <Image source={{uri: row.thumb}} style={styles.img} ></Image>
        <View style={styles.reply}>
           <Text style={styles.nickname}>{row.nickname}</Text>
           <Text style={styles.detail}>{row.detail}</Text>
        </View>
      </View>
    )
  }

  onLoadStart(){
    this.setState({
      videoReady:false
    })
    console.log('onLoadStart')
  }

  onLoad(){
    this.setState({
      videoReady:false,
      videoProgress:0,
      videoTotal:0,
      videoCurrentTime:0
    })
  }

  onProgress(data){
    this.setState({
      videoReady:true,
      videoTotal:data.playableDuration,
      videoCurrentTime:data.currentTime,
      videoProgress:data.currentTime/data.playableDuration
    })
  }

  onEnd(){
    this.setState({
      videoReady:false,
      videoProgress:0,
      videoTotal:0,
      videoCurrentTime:0
    })
    // console.log('onEnd')
  }

  close(){
    this.setState({
      modalVisible:false
    })
  }

  videoError(){
    // console.log('videoError')
  }

  onBuffer(){
    // console.log('onBuffer')
  }

  _focus(){
    this.setState({
      modalVisible:true,
    })
  }

  onTimedMetadata(){
    // console.log('onTimedMetadata')
  }

  render() {
    // console.log('地址',this.props.data)
    return (
      <View style={styles.container} automaticallyAdjustContentInsets={true}>
        <View style={styles.videoBox}>
          <Video
              ref='videoPlayer'
              source={{uri: this.props.data}}
              rate={1.0}                   // 0 is paused, 1 is normal.
              volume={3.0}                 // 0 is muted, 1 is normal.
              muted={this.state.muted}     //静音
              paused={false}               // Pauses playback entirely.
              resizeMode='cover'           // Fill the whole screen at aspect ratio.
              style={styles.video}
              repeat={true}                           // Repeat forever.
              playInBackground={false}                // Audio continues to play when app entering background.
              playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
              ignoreSilentSwitch={"ignore"}           //
              progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
              onLoadStart={this.onLoadStart.bind(this)}          // Callback when video starts to load
              onLoad={this.onLoad.bind(this)}                    // Callback when video loads
              onProgress={this.onProgress.bind(this)}            // Callback every ~250ms with currentTime
              onEnd={this.onEnd.bind(this)}                      // Callback when playback finishes
              onError={this.videoError.bind(this)}               // Callback when video cannot be loaded
              onBuffer={this.onBuffer.bind(this)}                // Callback when remote video is buffering
              onTimedMetadata={this.onTimedMetadata.bind(this)}  // Callback when the stream receive some metadata
          />
          {
            !this.state.videoReady &&<ActivityIndicator color={'#ee735c'} style={styles.loading}/>
          }
          <View style={styles.progressBox}>
              <View style={[styles.progressBar,{width:width*this.state.videoProgress}]}>
              </View>
          </View>
        </View>
        <View style={styles.commentBox}>

      <Text style={{height:30}}> 精彩评论</Text>

        </View>
       <ListView dataSource={this.state.dataSource} renderRow={this.renderRow} style={styles.list} enableEmptySections={true} > </ListView>
        <Modal
          animationType={"fade"}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
           <View style={{marginTop: 22}}>
            <View style={{alignSelf: 'center'}} >
              <Text style={{marginTop: 25}}>不想写评论页面了</Text>
            </View>
            <Icon name="close" size={25} color="black" style={styles.closeIcon} onPress={this.close} />
           </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  closeIcon:{
    position:'absolute',
    top:25,
    left:15
  },
  commentBox:{
    height:50,
    width:width
  },
    list:{
      backgroundColor:'#EEE',
      width:width,
      flex:1
    },
  replyBox:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:10,
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#666',
    marginLeft:10,
    width:width-20
    },
  img:{
    width:40,
    height:40,
    marginRight:10,
    marginLeft:10,
    borderRadius:20
  },
  nickname:{
    fontWeight:'600',
    color:'#000',
    fontSize:18
  },

  detail:{
    marginTop:4,
    color:'#666',
  },

  reply:{
    flex:1
  },

  progressBox:{
    position:'relative',
    height:2,
    backgroundColor:'#ccc'
  },

  progressBar:{
    height:2,
    backgroundColor:'#ff6600'
  },

  loading:{
    position:'absolute',
    left:0,
    top:140,
    width:width,
    // alignSelf:'center',
    backgroundColor:'transparent'
  },

  container:{
    marginTop:64,
    flex:1,
    backgroundColor:'white',
    // justifyContent:'center',
    alignItems:'center'
  },
  videoBox:{
    width:width,
    height:360,
    backgroundColor:'#000'
  },
  video:{
    width:width,
    height:360,
    backgroundColor:'#000'
  }
});


export default Detail;
