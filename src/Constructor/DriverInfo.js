/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Image,
  StyleSheet
} from 'react-native'

import moment from 'moment-timezone'
import ScalableText from 'react-native-text'

class DriverInfo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const dob = moment(this.props.dob).format('DD/MM/YYYY')
    const { number, firstName, lastName, nationality, races, championship, wins, polePosition, podiums, stylePosition } = this.props
    let boxPosition

    if (stylePosition === 'left') {
      boxPosition = styles.boxLeft
    } else {
      boxPosition = styles.boxRight
    }

    return (
      <View style={ boxPosition }>
        <View style={ styles.driverInfo }>
          <ScalableText style={ styles.number }>{ number }</ScalableText>
          <View style={ styles.driverNameBox }>
            <ScalableText style={ styles.driverName }>{ firstName }</ScalableText>
            <ScalableText style={ styles.driverName }>{ lastName }</ScalableText>
          </View>
          <Image
            style={ styles.flag }
            source={{uri: `https://s3-eu-west-1.amazonaws.com/f1-storage/Flags/${ nationality }.png`}}/>
        </View>
        <View style={ styles.list }>
          <ScalableText style={ styles.infoTxt }>Nationality:</ScalableText>
          <ScalableText style={ styles.infoPoints }>{ nationality }</ScalableText>
        </View>
        <View style={ styles.list }>
          <ScalableText style={ styles.infoTxt }>Date of birthday:</ScalableText>
          <ScalableText style={ styles.infoPoints }>{dob}</ScalableText>
        </View>
        <View style={ styles.list }>
          <ScalableText style={ styles.infoTxt }>Races:</ScalableText>
          <ScalableText style={ styles.infoPoints }>{ races }</ScalableText>
        </View>
        <View style={ styles.list }>
          <ScalableText style={ styles.infoTxt }>World Championship:</ScalableText>
          <ScalableText style={ styles.infoPoints }>{ championship }</ScalableText>
        </View>
        <View style={ styles.list }>
          <ScalableText style={ styles.infoTxt }>Victories:</ScalableText>
          <ScalableText style={ styles.infoPoints }>{ wins }</ScalableText>
        </View>
        <View style={ styles.list }>
          <ScalableText style={ styles.infoTxt }>Pole position:</ScalableText>
          <ScalableText style={ styles.infoPoints }>{ polePosition }</ScalableText>
        </View>
        <View style={ styles.list }>
          <ScalableText style={ styles.infoTxt }>Podiums:</ScalableText>
          <ScalableText style={ styles.infoPoints }>{ podiums }</ScalableText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  boxLeft: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 10,
    paddingRight: 5
  },
  boxRight: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingRight: 10,
    paddingLeft: 5
  },
  driverInfo: {
    flexDirection: 'row'
  },
  number: {
    fontSize: 40,
    lineHeight: 28,
    paddingTop: 0,
    paddingRight: 5,
    fontFamily: 'Raleway-Light',
    color: '#f94057'
  },
  driverNameBox: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 10
  },
  driverName: {
    fontSize: 14,
    fontFamily: 'Raleway-SemiBold'
  },
  flag: {
    marginTop: 5,
    height: 11,
    width: 16,
    alignItems: 'flex-end'
  },
  list: {
    height: 26,
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

DriverInfo.propTypes = {
  code: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  races: PropTypes.string.isRequired,
  championship: PropTypes.string.isRequired,
  wins: PropTypes.string.isRequired,
  polePosition: PropTypes.string.isRequired,
  podiums: PropTypes.number.isRequired,
  stylePosition: PropTypes.string.isRequired
}

module.exports = DriverInfo
