/* @flow */
import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import ScalableText from 'react-native-text'

class ErrorPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isConnected: true
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <ScalableText style={ styles.txt }>Box! Box! Box!</ScalableText>
        <ScalableText style={ styles.txt }>Our pit crew changes something.</ScalableText>
        <Image style={ styles.pitStop }
               source={ require('../../assets/images/pit-stop.jpg') } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#313234',
    paddingTop: 20
  },
  txt: {
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
    lineHeight: 22,
    color: '#fff',
    textAlign: 'center'
  },
  pitStop: {
    width: null,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    position: 'relative',
    flex: 1
  }
})

module.exports = ErrorPage
