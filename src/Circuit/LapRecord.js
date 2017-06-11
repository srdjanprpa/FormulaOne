/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  StyleSheet
} from 'react-native'

import ScalableText from 'react-native-text'

class LapRecord extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { time, firstName, lastName, year, constructorName, averageSpeed } = this.props

    return (
      <View style={ styles.lapRecord }>
        <View style={ styles.titleBox }>
          <ScalableText style={ styles.titleTxt }>Lap Record</ScalableText>
        </View>
        <View style={ styles.row }>
          <View style={ styles.flex }>
            <ScalableText style={ styles.name }>
              { lastName } { firstName } <ScalableText style={[ styles.txt, styles.year ]}>({ year })</ScalableText>
            </ScalableText>
            <ScalableText style={ styles.teamConstructor }>{ constructorName }</ScalableText>
          </View>
          <View>
            <ScalableText style={ styles.time }>{ time }</ScalableText>
            <ScalableText style={ styles.averageSpeed }>
              <ScalableText style={ styles.txt }>Average speed</ScalableText> { averageSpeed } <ScalableText style={ styles.txt }>(kph)</ScalableText>
            </ScalableText>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  lapRecord: {
    backgroundColor: 'transparent',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  titleBox: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e1e4ec',
    marginBottom: 5
  },
  titleTxt: {
    color: '#819cad',
    fontSize: 8,
    fontFamily: 'Raleway-SemiBold',
    paddingBottom: 1
  },
  name: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: '#444'
  },
  year: {
    lineHeight: 18
  },
  teamConstructor: {
    fontFamily: 'Raleway-Medium',
    fontSize: 12,
    lineHeight: 12,
    color: '#819cad',
    paddingTop: 5
  },
  time: {
    fontFamily: 'Raleway-SemiBold',
    textAlign: 'right',
    color: '#444',
    fontSize: 16
  },
  averageSpeed: {
    fontFamily: 'Raleway-SemiBold',
    textAlign: 'right',
    color: '#f94057',
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5
  },
  txt: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 10,
    lineHeight: 12,
    color: '#819cad'
  }
})

LapRecord.propTypes = {
  time: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  constructorName: PropTypes.string.isRequired,
  averageSpeed: PropTypes.string.isRequired
}

module.exports = LapRecord
