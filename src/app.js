/* @flow */
import React from 'react'

import {
  View,
  StatusBar
} from 'react-native'

import {
  StackNavigator,
  DrawerNavigator
} from 'react-navigation'

import StandingsScreen      from './Standings/Standings'
import CalendarScreen       from './Calendar/Calendar'
import CircuitScreen        from './Circuit/Circuit'
import ConstructorScreen    from './Constructor/Constructor'
import SlideMenu            from './Components/SlideMenu'

const MainScreen = DrawerNavigator(
  {
    Standings: {
      path: '/standings',
      screen: StandingsScreen
    },
    Calendar: {
      path: '/calendar',
      screen: CalendarScreen
    }
  },
  {
    contentComponent: SlideMenu,
    drawerPosition: 'left',
    initialRouteName: 'Standings',
    contentOptions: {
      activeTintColor: '#e91e63'
    },
    style: {
      backgroundColor: '#202930'
    }
  }
)

const F1Routes = {
  MainScreen: {
    name: 'MainScreen',
    screen: MainScreen
  },
  CircuitScreen: {
    name: 'CircuitScreen',
    screen: CircuitScreen,
    path: 'circuit/:detail'
  },
  ConstructorScreen: {
    name: 'ConstructorScreen',
    screen: ConstructorScreen,
    path: 'constructor/:detail'
  }
}

const AppNavigator = StackNavigator(
  {
    ...F1Routes,
    Index: {
      screen: MainScreen
    }
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',

    /*
     * Use modal on iOS because the card mode comes from the right,
     * which conflicts with the drawer example gesture
     */
    mode: 'card'
  }
)

export default () => (
  <View style={{ flex: 1 }}>
    <StatusBar
      barStyle="light-content"
      backgroundColor={'#202930'} />
    <AppNavigator />
  </View>
)
