/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Platform
} from 'react-native'

import ScalableText from 'react-native-text'

class HomeHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { navigation, title } = this.props

    return (
      <View style={ styles.header }>
        <TouchableHighlight
          onPress={ () => navigation.navigate('DrawerOpen') }>
          <Image
            style={ styles.btnLeft }
            source={ require('../../assets/images/btn-menu.png') } />
        </TouchableHighlight>
        <ScalableText style={ styles.title }>{ title }</ScalableText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#202930',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnLeft: {
    height: 60,
    width: 60
  },
  title: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold'
  }
})

HomeHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}

module.exports = HomeHeader
