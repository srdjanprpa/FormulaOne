/* @flow */
import React from 'react'

import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native'

export default class StatsHeader extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.position}>#</Text>
        <Text style={styles.name}> {this.props.name} </Text>
        <Text style={styles.time}>Time</Text>
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
    width: 30,
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
    width: 80,
    height: 22,
    lineHeight: Platform.OS === 'ios' ? 22 : 20,
    color: '#fff',
    textAlign: 'right'
  }
})
