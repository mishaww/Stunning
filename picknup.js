import React, { Component } from 'react';
import {Camera, Permissions} from 'expo';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import download from './download';;

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  PixelRatio,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class pick extends React.Component {
  

  render() {
    global.textname;
    var state = {
      video: null,
      //name:null,
      success:false,
    };

    // let { video } = { uri: result.uri };
    // const target_url  = 'http://140.115.87.141:9888/';

    var styles = StyleSheet.create({
      avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {
        borderRadius: 50,
        width: 100,
        height: 100,
      },
    });

    return (
      
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5FCFF',
        }}>
        <TouchableOpacity onPress={() => this._pickVideo()}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>從圖庫選擇</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => this._openCamera()}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>開啟相機</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.getAsync(
        Permissions.CAMERA
        );
      Permissions.askAsync(Permissions.CAMERA);  
      if (status !== 'granted') {
        alert('Sorry, we need permissions to make this work!');
      }
    }
  };

  _pickVideo = async () => {
    //this.getPermissionAsync
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
    });
 
    // console.log(result);

    if (!result.cancelled) {
      this.setState({ video: result });
    }

    let video = this.state.video;
    let target_url  = 'http://140.115.87.141:9888/';
    localUri = video.uri;
    let filename = localUri.split('/').pop();

    let formData = new FormData();

        formData.append('file', {
            name: filename,
            type: 'video/mp4',
            uri: video.uri,
              // .replace("file://", ""),     
        });

    fetch(target_url,{
      method: 'POST',
      // body: JSON.stringify(formData),
      body: formData,
      headers: {
        // "Accept": "application/json",
        // "Content-Type": 'application/json',      
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log("upload success\n", response);
      alert("Upload success!");
       
       //console.log('888')
      return response.text()
       
      
    })
    .catch(error => {
      console.log("\n\n\nupload error\n\n\n", error);
      alert("Upload failed!");
    }).then(textData => {
      this.setState({ name: textData })
      //download.setState({name: textData})
      console.log(textData);
      textname = textData;
      //this.setState({ success:true})
      //console.log(this.state.success);
      //alert("okkkkk");
      this.props.navigation.navigate('Load')
    });

    
  } 

  
  // //照相機功能
  //  _openCamera = async () => {

  //   let result = await ImagePicker.launchCameraAsync()({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     // aspect: [4, 3],
  //   });

  //   if (!result.cancelled) {
  //     this.setState({ video: result });
  //   }

  //     let video = this.state.video;
  //     let localUri = video.uri;
  //     let target_url = 'http://140.115.87.141:9888/';
  //     let filename = localUri.split('/').pop();

  //     let formData = new FormData();

  //         formData.append('file', {
  //             name: filename,
  //             type: 'video/mp4',
  //             uri: video.uri,
  //               // .replace("file://", ""),     
  //         });

  //     fetch(target_url,{
  //       method: 'POST',
  //       // body: JSON.stringify(formData),
  //       body: formData,
  //       headers: {
  //         // "Accept": "application/json",
  //         // "Content-Type": 'application/json',      
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     })
  //     .then(response => {
  //       console.log("upload success", response);
  //       alert("Upload success!");
  //       return response.text()
  //       // this.setState({ video: null });
  //     })
  //     .catch(error => {
  //       console.log("\n\n\nupload error\n\n\n", error);
  //       alert("Upload failed!");
  //     }).then(textData => {
  //       console.log(textData);
  //       alert("okkkkk");
  //     });

  // }; //end _openCamera

} 

