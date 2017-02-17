/* @flow */

import React from 'react'

import {
  Platform,
} from 'react-native'

import {
  StackNavigator,
  DrawerNavigator
} from 'react-navigation'

import StandingsScreen from './Standings/Standings'
import CalendarScreen from './Calendar/Calendar'
import SlideMenu from './Components/SlideMenu'

const MainScreen = DrawerNavigator(
  {
    Standings: {
      path: '/standings',
      screen: StandingsScreen
    },
    Calendar: {
      path: '/calendar',
      screen: CalendarScreen,
    },
  },
  {
    contentComponent: SlideMenu,
    drawerPosition: 'left',
    initialRouteName: 'Standings',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
    style: {
      backgroundColor: '#202930',
    }
  }
)

const ExampleRoutes = {
  MainScreen: {
    name: 'MainScreen',
    screen: MainScreen,
  },
}

const AppNavigator = StackNavigator(
  {
    ...ExampleRoutes,
    Index: {
      screen: MainScreen,
    },
  },
  {
    initialRouteName: 'Index',
    headerMode: 'none',

    /*
     * Use modal on iOS because the card mode comes from the right,
     * which conflicts with the drawer example gesture
     */
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
  }
)

export default () => <AppNavigator />
