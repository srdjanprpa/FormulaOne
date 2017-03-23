/* @flow */
/* eslint no-undef: "error" */
/* eslint-env node */
import React from 'react'

import {
  View,
  StyleSheet,
} from 'react-native'

import ScalableText from 'react-native-text'

export default class ConstructorInfo extends React.Component {
  static propTypes = {
    teamId: React.PropTypes.string.isRequired,
    championship: React.PropTypes.string.isRequired,
    wins: React.PropTypes.string.isRequired,
    races: React.PropTypes.string.isRequired,
    polePosition: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.teamInfo}>
          <View style={[styles.halfFlex, styles.paddingHorizontal]}>
            <ScalableText style={styles.infoTxt}>World championship</ScalableText>
            <ScalableText style={styles.infoPoints}>{this.props.championship}</ScalableText>
          </View>
          <View style={[styles.halfFlex, styles.paddingHorizontal]}>
            <ScalableText style={styles.infoTxt}>Total wins</ScalableText>
            <ScalableText style={styles.infoPoints}>{this.props.wins}</ScalableText>
          </View>
        </View>
        <View style={styles.teamInfo}>
          <View style={[styles.halfFlex, styles.paddingHorizontal]}>
            <ScalableText style={styles.infoTxt}>Total Races</ScalableText>
            <ScalableText style={styles.infoPoints}>{this.props.races}</ScalableText>
          </View>
          <View style={[styles.halfFlex, styles.paddingHorizontal]}>
            <ScalableText style={styles.infoTxt}>Pole position</ScalableText>
            <ScalableText style={styles.infoPoints}>{this.props.polePosition}</ScalableText>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  paddingHorizontal: {
    paddingHorizontal: 10,
  },
  halfFlex: {
    flex: 1,
    flexDirection: 'row',
  },
  logoBox: {
    flex: 1,
  },
  teamLogo: {
    height: 60,
    resizeMode: 'contain',
  },
  teamInfo: {
    paddingVertical: 5,
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
