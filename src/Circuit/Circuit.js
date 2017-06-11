/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Platform,
  StatusBar
} from 'react-native'

import Dimensions from 'Dimensions'
import ScalableText from 'react-native-text'

import CircuitContent from './CircuitContent'

const { width } = Dimensions.get('window')

class CircuitScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { navigation } = this.props
    const { round, season, date, time, Circuit: { circuitName, locality, country, circuitId } } = this.props.navigation.state.params.details

    return (
      <View style={ styles.container }>
        <StatusBar
          barStyle="light-content"
          backgroundColor={'transparent'}
          translucent={true} />
        <Image
          style={styles.bgImg}
          source={require('../../assets/images/circuit.jpg')} />
        <View style={ styles.content }>
          <View style={ styles.headerTitle }>
            <ScalableText style={ styles.headerTxt }>{ circuitName }</ScalableText>
            <ScalableText style={ styles.subHeaderTxt }>{ locality } { country } ( Round: { round } - { season } )</ScalableText>
          </View>
          <TouchableHighlight
            style={ styles.btn }
            onPress={ () => navigation.goBack() }>
            <Image
              style={ styles.btnLeft }
              source={ require('../../assets/images/btn-back.png') } />
          </TouchableHighlight>
          <CircuitContent
            season={ season }
            round={ round }
            circuitId={ circuitId }
            date={ date }
            time={ time }/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202930',
    flex: 1
  },
  bgImg: {
    flexDirection: 'row',
    position: 'absolute',
    width: width,
    height: 150,
    backgroundColor: 'transparent'
  },
  content: {
    paddingTop: Platform.OS === 'ios' ? 20 : 24,
    backgroundColor: 'transparent',
    flex: 1
  },
  btn: {
    height: 60,
    width: 60,
    marginBottom: Platform.OS === 'ios' ? 17 : 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnLeft: {
    height: 40,
    width: 40
  },
  headerTitle: {
    top: Platform.OS === 'ios' ? 40 : 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: width
  },
  headerTxt: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold',
    flexDirection: 'row',
    textAlign: 'center'
  },
  subHeaderTxt: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
    fontFamily: 'Raleway-Medium',
    flexDirection: 'row',
    textAlign: 'center'
  }
})

CircuitScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

module.exports = CircuitScreen
