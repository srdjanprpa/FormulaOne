/* @flow */
import React from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class StatsHeader extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.position}>
          <Text style={styles.positionTxt}>#</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}> {this.props.name} </Text>
        </View>
        <View style={styles.position}><Text style={styles.wins}>Wins</Text></View>
        <View style={styles.position}><Text style={styles.points}>Points</Text></View>
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
  positionTxt: {
    textAlign: 'center',
    color: '#fff',
  },
  name: {
    color: '#fff',
  },
  info: {
    flex: 1,
    height: 24,
    justifyContent: 'center',
  },
  position: {
    height: 22,
    justifyContent: 'center',
    width: 45,
  },
  wins: {
    color: '#fff',
    textAlign: 'center'
  },
  points: {
    color: '#fff',
    textAlign: 'right'
  }
})
