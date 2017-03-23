/* @flow */
import React from 'react'

import {
  View,
  StyleSheet,
  Platform,
} from 'react-native'

import ScalableText from 'react-native-text'

export default class StatsHeader extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <View style={styles.header}>
        <ScalableText style={styles.position}>#</ScalableText>
        <ScalableText style={styles.name}> {this.props.name} </ScalableText>
        <ScalableText style={styles.time}>Time</ScalableText>
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
    backgroundColor: '#2a3540',
    flexDirection: 'row',
  },
  position: {
    width: 20,
    height: 22,
    lineHeight: Platform.OS === 'ios' ? 22 : 20,
    marginRight: 10,
    textAlign: 'center',
    color: '#fff',
  },
  name: {
    color: '#fff',
    flex: 1,
    height: 22,
    lineHeight: Platform.OS === 'ios' ? 22 : 20,
  },
  time: {
    width: 95,
    height: 22,
    lineHeight: Platform.OS === 'ios' ? 22 : 20,
    color: '#fff',
    textAlign: 'right'
  }
})
