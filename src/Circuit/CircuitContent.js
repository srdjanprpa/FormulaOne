/* @flow */
import React from 'react'

import {
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'

import {
  createNavigator,
  createNavigationContainer,
  TabRouter,
  addNavigationHelpers,
} from 'react-navigation'

import ScalableText from 'react-native-text'

import QualifyingScreen from './Qualifying'
import ResultsScreen from './Results'

class CustomTabBar extends React.Component {
  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      pressed: '',
    }
  }

  render() {
    return (
      <View style={styles.tabContainer}>
        {this.props.navigation.state.routes.map((route, index) => (
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate(route.routeName)}
            onHideUnderlay={()=>{this.setState({pressed: ''})}}
            onShowUnderlay={()=>{this.setState({pressed: route.routeName})}}
            style={[styles.tab, this.state.pressed ===  route.routeName ? styles.tabPress : {}]}
            key={route.routeName}>
            <View>
              <ScalableText style={[styles.tabTxt, this.props.navigation.state.index === index ? styles.tabTxtActive : {}]}>
                {route.routeName}
              </ScalableText>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    )
  }
}

const CustomTabView = ({router, navigation, info}) => {
  const { routes, index } = navigation.state
  const ActiveScreen = router.getComponentForState(navigation.state)

  return (
    <View style={styles.container}>
      <CustomTabBar navigation={navigation} />
      <ActiveScreen
        info={info}
        navigation={addNavigationHelpers({
          ...navigation,
          state: routes[index],
        })}/>
    </View>
  )
}
CustomTabView.propTypes = {
  router: React.PropTypes.object.isRequired,
  navigation: React.PropTypes.object.isRequired,
  info: React.PropTypes.object.isRequired
}

const CustomTabRouter = TabRouter(
  {
    Qualifying: {
      screen: QualifyingScreen,
      path: '/qualifying',
    },
    Results: {
      screen: ResultsScreen,
      path: '/results',
    },
  },
  {
    // Change this to start on a different tab
    initialRouteName: 'Qualifying',
  }
)

const CircuitContent = createNavigationContainer(createNavigator(CustomTabRouter)(CustomTabView))

export default CircuitContent

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 50,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPress: {
    backgroundColor: 'transparent',
  },
  tabTxt: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Raleway-SemiBold',
  },
  tabTxtActive: {
    color: '#f94057',
  },
})
