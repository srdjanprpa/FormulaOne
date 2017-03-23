/* @flow */
/* eslint no-undef: "error" */
/* eslint-env node */
import React from 'react'

import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native'

import Dimensions from 'Dimensions'
import ScalableText from 'react-native-text'

import CircuitContent from './CircuitContent'

const { width } = Dimensions.get('window')

export default class CircuitScreen extends React.Component {
  static propTypes = {
    navigation: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const circuitName = this.props.navigation.state.params.detail.Circuit.circuitName
    const locality = this.props.navigation.state.params.detail.Circuit.Location.locality
    const country = this.props.navigation.state.params.detail.Circuit.Location.country
    const round = this.props.navigation.state.params.detail.round
    const season = this.props.navigation.state.params.detail.season

    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImg}
          source={require('../../assets/images/circuit.jpg')}>
        </Image>
        <View style={styles.content}>
          <View style={styles.headerTitle}>
            <ScalableText style={styles.headerTxt}>{circuitName}</ScalableText>
            <ScalableText style={styles.subHeaderTxt}>{locality} {country} ( Round: {round} - {season} )</ScalableText>
          </View>
          <TouchableHighlight
            style={styles.btn}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              style={styles.btnLeft}
              source={require('../../assets/images/btn-back.png')} />
          </TouchableHighlight>
          <CircuitContent info={this.props.navigation.state.params.detail}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  bgImg: {
    flexDirection: 'row',
    position: 'absolute',
    width: width,
    height: 150,
    backgroundColor: 'transparent',
  },
  content: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: 'transparent',
    flex: 1,
  },
  btn: {
    height: 60,
    width: 60,
    marginBottom: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLeft: {
    height: 40,
    width: 40,
  },
  headerTitle: {
    top: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: width,
  },
  headerTxt: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold',
    flexDirection: 'row',
    textAlign: 'center',
  },
  subHeaderTxt: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
    fontFamily: 'Raleway-Medium',
    flexDirection: 'row',
    textAlign: 'center',
  }
})
