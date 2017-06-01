import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codeSent:false
    };
  }
  yzm(){
    console.log('按钮点击')
    this.setState({
      codeSent:!this.state.codeSent
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>快速登入</Text>
          <TextInput autoCorrect={false} keyboardType={'numeric'}  style={styles.input} onChangeText={(text)=>{this.setState({phone:text})}} placeholder={'输入手机号'}></TextInput>
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.yzm.bind(this)}>
        {
          this.state.codeSent
          ? <View ><Text style={styles.mytext}>登入</Text></View>
          : <View  ><Text style={styles.mytext}>获取验证码</Text></View>
        }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    alignItems:'center'
  },
  box:{
    marginTop:64,
  },
  title:{
  },
  input:{
    height:40,
    width:400,
    padding:5,
    fontSize:16,
    backgroundColor:'#fff',
    borderRadius:4
  },
  btn:{
    marginTop:50,
    height:40,
    backgroundColor:'transparent',
    width:300,
    borderRadius:4,
    borderColor:'orange',
    borderWidth:1
  },
  mytext:{
  color:'orange',
  textAlign:'center',
  lineHeight:35,
}
});


export default Login;
