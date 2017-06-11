/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native'

import {
  createNavigator,
  createNavigationContainer,
  TabRouter,
  addNavigationHelpers
} from 'react-navigation'

import ScalableText from 'react-native-text'

import InfoScreen from './Info'
import QualifyingScreen from './Qualifying'
import ResultsScreen from './Results'

class CustomTabBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pressed: ''
    }
  }

  render() {
    const { navigation, navigation: { state } } = this.props

    return (
      <View style={ styles.tabContainer }>
        {state.routes.map((route, index) => (
          <TouchableHighlight
            onPress={ () => navigation.navigate(route.routeName) }
            onHideUnderlay={ () => this.setState({ pressed: '' }) }
            onShowUnderlay={ () => this.setState({ pressed: route.routeName }) }
            style={[
              styles.tab,
              this.state.pressed === route.routeName ? styles.tabPress : {},
              state.index === index ? styles.tabActive : {}
            ]}
            key={ route.routeName }>
            <View>
              <ScalableText style={[
                styles.tabTxt,
                state.index === index ? styles.tabTxtActive : {}
              ]}>
                { route.routeName }
              </ScalableText>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    )
  }
}

CustomTabBar.propTypes = {
  navigation: PropTypes.object.isRequired
}

const CustomTabView = ({ router, navigation, season, round, circuitId, date, time }) => {
  const { routes, index } = navigation.state
  const ActiveScreen = router.getComponentForState(navigation.state)

  return (
    <View style={ styles.container }>
      <CustomTabBar navigation={navigation} />
      <Image source={require('../../assets/images/bg-constructor.jpg')} style={ styles.backgroundImage }>
        <ActiveScreen
          season={ season }
          round={ round }
          date={ date }
          time={ time }
          circuitId={ circuitId }
          navigation={addNavigationHelpers({
            ...navigation,
            state: routes[index]
          })}/>
      </Image>
    </View>
  )
}

CustomTabView.propTypes = {
  router: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  season: PropTypes.string.isRequired,
  round: PropTypes.string.isRequired,
  circuitId: PropTypes.string.isRequired,
  date: PropTypes.string,
  time: PropTypes.string
}

const CustomTabRouter = TabRouter(
  {
    Info: {
      screen: InfoScreen,
      path: '/info'
    },
    Qualifying: {
      screen: QualifyingScreen,
      path: '/qualifying'
    },
    Results: {
      screen: ResultsScreen,
      path: '/results'
    }
  },
  {
    // Change this to start on a different tab
    initialRouteName: 'Info'
  }
)

const CircuitContent = createNavigationContainer(createNavigator(CustomTabRouter)(CustomTabView))

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#fff'
  },
  tabContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 50
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#444'
  },
  tabActive: {
    borderColor: '#f94057'
  },
  tabPress: {
    borderColor: '#fff',
    backgroundColor: 'transparent'
  },
  tabTxt: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Raleway-SemiBold'
  },
  tabTxtActive: {
    color: '#f94057'
  }
})

module.exports = CircuitContent
