//import * as React from 'react';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {ImagePicker, Permissions, Constants} from 'expo';
import { Video } from 'expo-av';
//import { createStackNavigator, createAppContainer } from "react-navigation";

export default class ChooseImage extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Choose from camera roll"
          onPress={this._pickImage}
        />
        {//image &&
          //<Image source={{ uri: image }} style={{ width: 250, height: 250 }} />} 
        <Video
          source={{ uri: image }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: 300, height: 270 }}/>}
        <Button
          title="Submit"
          //onPress={this._pickImage}
        />  
        <Button
          title="back"
          //onPress={props.navigation.goBack()}
        />
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      //allowsEditing: true,
      //aspect: [1, 1],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


