/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Image,
  StyleSheet
} from 'react-native'

import Dimensions from 'Dimensions'

const { width } = Dimensions.get('window')

class Avatar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { code, stylePosition } = this.props
    let boxPosition

    if (stylePosition === 'left') {
      boxPosition = styles.boxLeft
    } else {
      boxPosition = styles.boxRight
    }

    return (
      <View style={ boxPosition }>
        <Image
          style={ styles.avatar }
          source={{ uri: `https://s3-eu-west-1.amazonaws.com/f1-storage/Drivers/${ code }.jpg` }}/>
        <Image
          style={ styles.helmet }
          source={{ uri: `https://s3-eu-west-1.amazonaws.com/f1-storage/Helmet/${ code }.png` }}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  boxLeft: {
    flex: 1,
    paddingBottom: 10,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 5
  },
  boxRight: {
    flex: 1,
    paddingBottom: 10,
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 5
  },
  avatar: {
    width: (width/2 - 15),
    height: (width/2 - 15),
    resizeMode: 'contain'
  },
  helmet: {
    width: 77,
    height: 50,
    marginTop: 5,
    resizeMode: 'contain'
  }
})

Avatar.propTypes = {
  code: PropTypes.string.isRequired,
  stylePosition: PropTypes.string.isRequired
}

module.exports = Avatar
