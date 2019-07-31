import * as React from 'react';
//import React, {Component} from 'react';
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Text, View, Button, CameraRoll,Constants } from 'react-native';
import { Video } from 'expo-av';
import { Permissions } from 'expo-permissions';
import * as PickUp from './picknup';

export default class Download extends React.Component {
  state = {
    name: null,
  };
  render() {
    //let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        {//image &&
          //<Image source={{ uri: image }} style={{ width: 250, height: 250 }} />} 
        <Video
          source={{ uri:'http://140.115.87.141:9888/static/'+global.textname }} //http://techslides.com/demos/sample-videos/small.mp4
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: 300, height: 270 }}/>}
        <Button
          title="Download"
          onPress={this.downloadFile}
        />  
        <Button
          title="share"
          onPress={this.test}
        />
      
      </View>
      
    );
  }
  
  test = async () => {
    //alert('Hi')
    console.log('1111\n'+global.textname);
    alert(global.textname);
  }
  
  downloadFile = async () => {
    // PickUp.sendname()
    // DOWNLOAD VIDEO 
    const videoPath = FileSystem.documentDirectory+global.textname;
    console.log("1-"+videoPath);//http://techslides.com/demos/sample-videos/small.mp4
    const resvideo = await FileSystem.downloadAsync('http://140.115.87.141:9888/static/'+global.textname, videoPath);
    console.log("2-"+resvideo);
    const status ='granted';
    //console,log('video');
    if (status === 'granted') {
      try{
        //console.log("prima "+resvideo.uri);
        const resultvideo = await CameraRoll.saveToCameraRoll(resvideo.uri,'video');
        
        console.log("CAMERAROLL = "+resultvideo)
        //this.props.navigation.navigate('cam')
      }
      catch(e){
        console.log("err");
        console.warn(JSON.stringify(e))
      }
    }
    console.log("done")
    
  }  


}
// var filename = function getname() {
//   console.log('hi')
// };