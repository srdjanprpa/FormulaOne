/* @flow */
/* eslint no-undef: "error" */
/* eslint-env node */
import React from 'react'

import {
  View,
  Image,
  StyleSheet,
} from 'react-native'

import moment from 'moment-timezone'
import ScalableText from 'react-native-text'

export default class DriverInfo extends React.Component {
  static propTypes = {
    code: React.PropTypes.string.isRequired,
    firstName: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string.isRequired,
    number: React.PropTypes.string.isRequired,
    country: React.PropTypes.string.isRequired,
    dob: React.PropTypes.string.isRequired,
    races: React.PropTypes.string.isRequired,
    championship: React.PropTypes.string.isRequired,
    victories: React.PropTypes.string.isRequired,
    polePosition: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

  }

  render() {
    const dob = moment(this.props.dob).format('DD/MM/YYYY')

    return (
      <View style={styles.driverInfoBox}>
        <View style={styles.driverInfo}>
          <ScalableText style={styles.number}>{this.props.number}</ScalableText>
          <View style={styles.driverNameBox}>
            <ScalableText style={styles.driverName}>{this.props.firstName}</ScalableText>
            <ScalableText style={styles.driverName}>{this.props.lastName}</ScalableText>
          </View>
          <Image
            style={styles.flag}
            source={{uri: `https://s3-eu-west-1.amazonaws.com/f1-storage/Flags/${this.props.country}.png`}}/>
        </View>
        <View style={styles.list}>
          <ScalableText style={styles.infoTxt}>Country</ScalableText>
          <ScalableText style={styles.infoPoints}>{this.props.country}</ScalableText>
        </View>
        <View style={styles.list}>
          <ScalableText style={styles.infoTxt}>Date of birthday</ScalableText>
          <ScalableText style={styles.infoPoints}>{dob}</ScalableText>
        </View>
        <View style={styles.list}>
          <ScalableText style={styles.infoTxt}>Races</ScalableText>
          <ScalableText style={styles.infoPoints}>{this.props.races}</ScalableText>
        </View>
        <View style={styles.list}>
          <ScalableText style={styles.infoTxt}>Drivers Titles</ScalableText>
          <ScalableText style={styles.infoPoints}>{this.props.championship}</ScalableText>
        </View>
        <View style={styles.list}>
          <ScalableText style={styles.infoTxt}>Victories</ScalableText>
          <ScalableText style={styles.infoPoints}>{this.props.victories}</ScalableText>
        </View>
        <View style={styles.list}>
          <ScalableText style={styles.infoTxt}>Pole position</ScalableText>
          <ScalableText style={styles.infoPoints}>{this.props.polePosition}</ScalableText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  driverInfoBox: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2'
  },
  driverInfo: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  number: {
    fontSize: 40,
    lineHeight: 40,
    paddingRight: 5,
    fontFamily: 'Raleway-Light',
    color: '#f94057',
  },
  driverNameBox: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 10,
  },
  driverName: {
    fontSize: 14,
    fontFamily: 'Raleway-SemiBold',
  },
  flag: {
    marginTop: 8,
    height: 11,
    width: 16,
    alignItems: 'flex-end',
  },
  list: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
  },
  infoTxt: {
    color: '#819cad',
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
    flex: 1,
  },
  infoPoints: {
    color: '#444',
    fontSize: 12,
    fontFamily: 'Raleway-SemiBold',
    alignItems: 'flex-end',
  },
})
