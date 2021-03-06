/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { Settings } from '../../../AliceSDK/Web3';

const { height, width } = Dimensions.get('window');

export default class DAOstackApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      daos: [],
    };
  }

  newProposal = () => {
    const options = {};
    ReactNativeHapticFeedback.trigger('selection', options);
    this.props.navigation.navigate('NewProposal');
  };

  render() {
    const { proposal, key } = this.props;
    return (
      <View
        key={key}
        onPress={() => this.props.navigation.navigate('DAOstack/Home')}
        style={styles.daoBox}
      >
        <View
          style={{ width: '100%', padding: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              width: width - 70,
              marginBottom: 10,
            }}
          >
            <Text numberOfLines={1} style={{ fontWeight: '700' }}>
              {proposal.title}
            </Text>
            <TouchableOpacity onPress={() => Settings.openBrowser(proposal.url)}>
              <Image
                source={require('../Assets/link-icon.png')}
                style={{
                  height: 17,
                  marginLeft: 5,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          <Text>{proposal.description}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.toggleModal(proposal)}
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
        >
          <View style={{ alignItems: 'center', justifyContent: 'space-around', margin: 17 }}>
            <Text style={{ color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700' }}>
              Voting Percentage
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AnimatedCircularProgress
                style={{ marginRight: 15 }}
                size={47}
                width={3}
                fill={80}
                tintColor="#06BE90"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#D8D8D8"
              >
                {fill => (
                  <Image
                    source={require('../Assets/thumbs-up-green.png')}
                    style={{
                      height: 15,
                      resizeMode: 'contain',
                    }}
                  />
                )}
              </AnimatedCircularProgress>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'space-between',
                    justifyContent: 'space-between',
                  }}
                >
                  <Image
                    source={require('../Assets/thumbs-up-grey.png')}
                    style={{
                      height: 15,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text>6.49 %</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../Assets/thumbs-down-grey.png')}
                    style={{
                      height: 15,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text>6.49 %</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ height: 50, width: 1, backgroundColor: '#c9c9c9' }} />
          <View style={{ alignItems: 'center', justifyContent: 'space-around', margin: 17 }}>
            <Text style={{ color: 'grey', fontSize: 10, marginBottom: 15, fontWeight: '700' }}>
              Votes
            </Text>
            <Text style={{}}>Pass</Text>
            <Text style={{}}>Fail</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  daoBox: {
    width: width - 70,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
});
