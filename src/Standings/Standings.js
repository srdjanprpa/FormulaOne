/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  StatusBar
} from 'react-native'

import SplashScreen from 'react-native-splash-screen'

import HomeHeader from '../Components/HomeHeader'
import StandingsContent from './StandingsContent'


class StandingsScreen extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    const { navigation } = this.props

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={'#202930'} />
        <HomeHeader
          title="F1 Info"
          navigation={ navigation } />
        <StandingsContent
          teams={ (data) => { navigation.navigate('ConstructorScreen', {constructor: data} )} }
        />
      </View>
    )
  }
}

StandingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

module.exports = StandingsScreen
