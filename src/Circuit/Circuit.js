/* @flow */
/* eslint no-undef: "error" */
/* eslint-env node */
import React from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native'

import Dimensions from 'Dimensions'
const {width} = Dimensions.get('window')

import CircuitContent from './CircuitContent'

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
          <TouchableHighlight
            style={styles.btn}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              style={styles.btnLeft}
              source={require('../../assets/images/btn-back.png')} />
          </TouchableHighlight>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTxt}>{circuitName}</Text>
            <Text style={styles.subHeaderTxt}>{locality} {country} ( Round: {round} - {season} )</Text>
          </View>
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
    height: 40,
    width: 40,
  },
  btnLeft: {
    height: 40,
    width: 40,
  },
  headerTitle: {
    justifyContent: 'center',
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
