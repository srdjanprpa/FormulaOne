/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  StyleSheet
} from 'react-native'

import ScalableText from 'react-native-text'

class ConstructorInfo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { championship, wins, races, polePosition } = this.props

    return (
      <View style={ styles.container }>
        <View style={ styles.teamInfo }>
          <View style={[ styles.flex, styles.paddingLeft ]}>
            <ScalableText style={ styles.infoTxt }>World championship:</ScalableText>
            <ScalableText style={ styles.infoPoints }>{ championship }</ScalableText>
          </View>
          <View style={[ styles.flex, styles.paddingRight ]}>
            <ScalableText style={ styles.infoTxt }>Total wins:</ScalableText>
            <ScalableText style={ styles.infoPoints }>{ wins }</ScalableText>
          </View>
        </View>
        <View style={ styles.teamInfo }>
          <View style={[ styles.flex, styles.paddingLeft ]}>
            <ScalableText style={ styles.infoTxt }>Total Races:</ScalableText>
            <ScalableText style={ styles.infoPoints }>{ races }</ScalableText>
          </View>
          <View style={[ styles.flex, styles.paddingRight ]}>
            <ScalableText style={ styles.infoTxt }>Pole position:</ScalableText>
            <ScalableText style={ styles.infoPoints }>{ polePosition }</ScalableText>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  paddingLeft: {
    paddingLeft: 10,
    paddingRight: 5
  },
  paddingRight: {
    paddingRight: 10,
    paddingLeft: 5
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  logoBox: {
    flex: 1
  },
  teamLogo: {
    height: 60,
    resizeMode: 'contain'
  },
  teamInfo: {
    paddingVertical: 5,
    flexDirection: 'row'
  },
  infoTxt: {
    color: '#819cad',
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
    flex: 1
  },
  infoPoints: {
    color: '#444',
    fontSize: 12,
    fontFamily: 'Raleway-SemiBold',
    alignItems: 'flex-end'
  }
})

ConstructorInfo.propTypes = {
  championship: PropTypes.string.isRequired,
  wins: PropTypes.string.isRequired,
  races: PropTypes.string.isRequired,
  polePosition: PropTypes.string.isRequired
}

module.exports = ConstructorInfo
