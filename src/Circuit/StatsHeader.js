/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  StyleSheet,
  Platform
} from 'react-native'

import ScalableText from 'react-native-text'

class StatsHeader extends Component {
  render() {
    return (
      <View style={ styles.header }>
        <ScalableText style={[ styles.position, styles.txt ]}>#</ScalableText>
        <ScalableText style={[ styles.name, styles.txt ]}> {this.props.name} </ScalableText>
        <ScalableText style={[ styles.time, styles.txt ]}>Time</ScalableText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 10,
    backgroundColor: '#292929',
    flexDirection: 'row'
  },
  txt: {
    lineHeight: Platform.OS === 'ios' ? 22 : 20,
    height: 22,
    color: '#fff'
  },
  position: {
    marginRight: 10,
    width: 20,
    textAlign: 'center'
  },
  name: {
    flex: 1
  },
  time: {
    width: 95,
    textAlign: 'right'
  }
})

StatsHeader.propTypes = {
  name: PropTypes.string.isRequired
}

module.exports = StatsHeader
