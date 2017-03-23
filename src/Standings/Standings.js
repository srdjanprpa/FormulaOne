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
          title="F1 Info"
          navigation={this.props.navigation} />
        <StandingsContent
          team={(data) => {this.props.navigation.navigate('ConstructorScreen', {team: data})}}
        />
      </View>
    )
  }
}
