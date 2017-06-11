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
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={ styles.header }>
        <ScalableText style={[ styles.position, styles.txt ]}>#</ScalableText>
        <ScalableText style={[ styles.name, styles.txt ]}> { this.props.name } </ScalableText>
        <ScalableText style={[ styles.wins, styles.txt ]}>Wins</ScalableText>
        <ScalableText style={[ styles.points, styles.txt ]}>Points</ScalableText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    backgroundColor: '#2a3540',
    flexDirection: 'row'
  },
  txt: {
    lineHeight: Platform.OS === 'ios' ? 22 : 20,
    height: 22,
    color: '#fff'
  },
  position: {
    marginRight: 10,
    width: 35,
    textAlign: 'center'
  },
  name: {
    flex: 1
  },
  wins: {
    width: 45,
    textAlign: 'center'
  },
  points: {
    width: 50,
    textAlign: 'right'
  }
})

StatsHeader.propTypes = {
  name: PropTypes.string.isRequired
}

module.exports = StatsHeader
