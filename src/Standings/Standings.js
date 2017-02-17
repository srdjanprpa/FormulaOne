/* @flow */
import React from 'react'

import {
  View,
  StatusBar,
} from 'react-native'

import SplashScreen from 'react-native-splash-screen'

import HomeHeader from '../Components/HomeHeader'
import StandingsContent from './StandingsContent'


export default class StandingsScreen extends React.Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'Standings',
    }),
  }
  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={'#202930'} />
        <HomeHeader
          title="Formula One"
          navigation={this.props.navigation} />
        <StandingsContent />
      </View>
    )
  }
}
