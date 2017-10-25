/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, Text, View,TabBarIOS,NavigatorIOS} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import Account from './app/account/index.js'
import Edit from './app/edit/index.js'
import List from './app/creation/index.js'
var base64Icon ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

export default class AwesomeProject extends Component {

  constructor(props) {
    super(props)
      this.state = {
      selectedTab: 'blueTab'
    };
  }

   getInitialState(){

   }

  render() {
    return (
      <TabBarIOS
       tintColor="white"
       barTintColor="darkslateblue"
      >
      <TabBarIOS.Item
        title="Blue Tab"
        systemIcon='bookmarks'
        selected={this.state.selectedTab === 'blueTab'}
        onPress={() => {
          this.setState({
            selectedTab: 'blueTab',
          });
        }}>
        <NavigatorIOS
        initialRoute={{
          component: List,
          title: 'My Initial Scene',
        }}
        style={{flex: 1}}
        />
        {/* <List></List> */}
      </TabBarIOS.Item>
      <TabBarIOS.Item
        systemIcon="history"
        badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
        selected={this.state.selectedTab === 'redTab'}
        onPress={() => {
          this.setState({
            selectedTab: 'redTab'
          });
        }}>
        {/* <Edit></Edit> */}
        <NavigatorIOS
        initialRoute={{
          component: Edit,
          title: 'Edit',
        }}
        style={{flex: 1}}
        />
      </TabBarIOS.Item>
      <TabBarIOS.Item
        systemIcon="history"
        title="More"
        selected={this.state.selectedTab === 'greenTab'}
        onPress={() => {
          this.setState({
            selectedTab: 'greenTab'
          });
        }}>
        <NavigatorIOS
        initialRoute={{
          component: Account,
          title: 'Account',
        }}
        style={{flex: 1}}
        />
        {/* <Account></Account> */}
      </TabBarIOS.Item
    </TabBarIOS>
        );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

// 注意，这里用引号括起来的'HelloWorldApp'必须和你init创建的项目名一致
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
