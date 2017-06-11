/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  StyleSheet
} from 'react-native'

import ScalableText from 'react-native-text'

class InfoBox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { textFirstLine, textSecoundLine, textInfo } = this.props

    return (
      <View style={[ styles.row, styles.infoBox ]}>
        <View style={ styles.flex }>
          <ScalableText style={ styles.txt }>{ textFirstLine }</ScalableText>
          <ScalableText style={ styles.txt }>{ textSecoundLine }</ScalableText>
        </View>
        <View>
          <ScalableText style={ styles.textInfo }>{ textInfo }</ScalableText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  flex: {
    flex: 1,
    paddingTop: 2
  },
  infoBox: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    marginLeft: 10,
    marginRight: 10
  },
  txt: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 10,
    lineHeight: 12,
    color: '#819cad'
  },
  textInfo: {
    fontFamily: 'Raleway-Light',
    color: '#444',
    fontSize: 26,
    lineHeight: 28
  }
})

InfoBox.propTypes = {
  textFirstLine: PropTypes.string.isRequired,
  textSecoundLine: PropTypes.string,
  textInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
}

module.exports = InfoBox
