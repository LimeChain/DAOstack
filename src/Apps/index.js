/*
 * This is the ExampleMaps Registrar for Alice
 * Register your app by:
 * 1. Creating a folder in the src/Apps directory which contains your React Native app
 * 2. Exporting your app in the ExampleMaps Export Section
 * 3. Adding your app to the list of apps in the Apps List Section
*/

import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, View, Modal, Dimensions, WebView,
} from 'react-native';
import Icon from '../AliceComponents/IconComponent';
import {navigate} from "../AliceUtils/navigationWrapper";
import AppIcon from "../AliceComponents/AppIcon";
import {Settings} from "../AliceSDK/Web3";

/*        ExampleMaps Export Section */
export { default as Fork } from './Fork';
export { default as Foam } from './Foam';
export { default as Test } from './Example';
export { default as Mintbase } from './Mintbase';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const WEBVIEW = 'WEBVIEW';

export const AppRegistry = [
  // // Your ExampleMaps ( uncomment the code below this line & delete this entire line of code )
  // {
  //   appName: 'Your App\'s Name',
  //   // can be either written or a hexadecimal or rgba
  //   backgroundColor: '#8e00ff' || 'blue' || 'rgba(0,0,0,0.5)',
  //   homeRoute: 'YourAppRoute',
  //   // your apps icon has to contain the require function to be rendered -> require('../Assets/your_app_logo.png')
  //   icon: require('../Assets/your_app_logo.png')
  // },
  {
    appName: 'Fork',
    backgroundColor: '#8e00ff',
    homeRoute: 'Fork',
    icon: require('../AliceAssets/fork-logo.png')
  },
  {
    appName: 'Radar',
    backgroundColor: '#43fd9c',
    homeRoute: 'RadarRelay',
    icon: require('../AliceAssets/radar-black.png')
  },
  {
    appName: '#BUIDL',
    backgroundColor: '#ffffff',
    homeRoute: 'Test',
    icon: require('./Example/Assets/buidler.png')
  },
  {
    appName: 'Cryptokitties',
    backgroundColor: '#ffd6f7',
    homeRoute: 'Cryptokitties',
    icon: require('../AliceAssets/cryptokitties.png')
  },
  {
    appName: 'UniSwap',
    backgroundColor: '#faa8ff',
    homeRoute: 'Uniswap',
    icon: require('../AliceAssets/uniswap.png')
  },
  {
    appName: 'Mintbase',
    backgroundColor: '#587280',
    homeRoute: 'Uniswap',
    icon: require('./Mintbase/Assets/logo.png')
  },
  {
    appName: 'localethereum',
    backgroundColor: '#dbe0ff',
    homeRoute: 'LocalEthereum',
    icon: require('../AliceAssets/localethereum.png')
  },
  {
    appName: 'Foam',
    backgroundColor: '#ffffff',
    homeRoute: 'Foam',
    icon: require('../AliceAssets/foam.png')
  },
  {
    appName: 'Foam',
    backgroundColor: '#5A28C6',
    homeRoute: 'Foam',
    icon: require('../AliceAssets/bounties.png')
  },
  {
    appName: 'Gitcoin',
    backgroundColor: '#0D023B',
    homeRoute: 'Gitcoin',
    icon: require('../AliceAssets/gitcoin.png')
  },
];

const { height, width } = Dimensions.get('window');

type Props = {};
export default class AppsScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarIcon: ({ tintColor }) => <Icon icon="HomeGrey" size={45}/>,
    };
  };

  state = {
    modalVisible: false,
  };

  openBrowser = () => {
    ReactNativeHapticFeedback.trigger("impactLight", options);
    Settings.openBrowser()
  };

  back = () => {
    this.refs[WEBVIEW].goBack()
  }
  forward = () => {
    this.refs[WEBVIEW].goForward()
  }
  reload = () => {
    this.refs[WEBVIEW].reload()
  }
  stopLoading = () => {
    this.refs[WEBVIEW].stopLoading()
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <View style={{
          width: '100%', padding: 20, marginTop: 20, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.2)', alignItems: 'center', justifyContent: 'center'}} onPress={() => navigate('Tokens')}>
            <Image source={require('../AliceAssets/avatar-black.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
          </TouchableOpacity>
          <TouchableOpacity style={{width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(0,0,0,0.2)', alignItems: 'center', justifyContent: 'center'}} onPress={this.openBrowser}>
            <Image source={require('../AliceAssets/browser-icon.png')} style={{ resizeMode: 'contain', width: 17, height: 17 }}/>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.appsContainer}>
            {AppRegistry.map((app, i) => {
              return (<AppIcon key={i} appName={app.appName} backgroundColor={app.backgroundColor} homeRoute={app.homeRoute} icon={app.icon} iterator={i} />)
            })
            }
          </View>
        </View>
          <Modal
            animationType="slide"
            transparent={false}
            style={{backgroundColor: 'blue'}}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{flex: 1, borderRadius: 100, marginTop: 100}}>
            <WebView
              source={{uri: 'https://github.com/facebook/react-native'}}
              style={{flex: 1, paddingBottom: 60, alignItems: 'center', justifyContent: 'center', padding: 20}}
              ref={WEBVIEW}
              onMessage={(e) => console.log('message: ', e.nativeEvent.data)}
              injectedJavaScript="window.onscroll=(e) => {window.postMessage('hello')};"
              // injectedJavaScript={'(function(){return "Send me back!"}());'}
              // injectedJavaScript="window.onscroll=function(e){window.postMessage(e)}';"
            >
            </WebView>
            <View style={{position: 'absolute', bottom: 10, left: 0, width: width - 40, padding: 20, margin: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: 'yellow'}}>
              <TouchableOpacity onPress={this.back}>
                <Text>{'<'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.forward}>
                <Text>{'>'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.reload}>
                <Text>C</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleWebView}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  H1: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 17,
  },
  appIcon: {
    alignItems: 'center',
    height: 84,
    margin: 10,
    maxWidth: 84,
    justifyContent: 'space-between',
  },
  appsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10,
    paddingTop: 10,
    width: width - 20,

  },
  appSquare: {
    alignItems: 'center',
    backgroundColor: '#43fd9c',
    borderRadius: 32.5,
    height: 65,
    justifyContent: 'center',
    width: 65,
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  appText: {
    color: 'black',
    fontSize: 10,
    // fontFamily: 'Graphik',
  },
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  headingText: {
    color: 'black',
    fontSize: 20,
    // fontFamily: 'Graphik',
    fontWeight: '500'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
