//import * as React from 'react';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image, Navigator } from 'react-native';
var download = require('./App');
var choose = require('./choose');

class nav extends React.Component {
  render() {
    return (
      // 預設的 Route 放在 splash
      <Navigator
        initialRoute={
          {id: 'choose'}
        }
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }} />
      );
  }
  renderScene(route, navigator) {
    if (route.id === 'choose') {
      return (
        <SplashPage navigator={navigator} />
      );
    }
    if (route.id === 'download') {
      return (
        <ListPage navigator={navigator} />
      );
    }
    if (route.id === 'DetailPage') {
      return (
        <DetailPage navigator={navigator} />
      );
    }
  }
}

AppRegistry.registerComponent('NavPrj', () => NavPrj);
// export default (props) => {
//     let renderScene = (route, nav) => {
//       let onBack = () => {
//         nav.pop();
//       }
//       switch (route.id) {
//         case 'simple1':
//           return <choose onBack={onBack}/>;
//         case 'simple2':
//           return <download onBack={onBack}/>;
//         // case 'simple3':
//         //   return <Page3 onBack={onBack}/>;
//         default:
//           return (
//             <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'} }>
//               <Button buttonText={'choose'} onPress={() => nav.push({id: 'simple1', })} />
//               <Button buttonText={'download'} onPress={() => nav.push({id: 'simple2', })} />
//               {/* <Button buttonText={'Page 3'} onPress={() => nav.push({id: 'simple3', })} /> */}
//             </View>
//           )
//       }
//     }
  
//     let configureScene = (route, routeStack) => {
//       switch (route.id) {
//         case 'simple1':
//           return Navigator.SceneConfigs.VerticalDownSwipeJump
//         case 'simple2':
//           return Navigator.SceneConfigs.PushFromRight;
//         // case 'simple3':
//         //   return Navigator.SceneConfigs.FloatFromBottom;
//         default:
//           return Navigator.SceneConfigs.PushFromRight;
//       }
//     }
// }