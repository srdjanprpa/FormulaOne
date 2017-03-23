/* @flow */
/* eslint no-undef: "error" */
/* eslint-env node */
/*eslint-env es6 */
import React from 'react'

import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native'

import ScalableText from 'react-native-text'

import Avatar from './Avatar'
import DriverInfo from './DriverInfo'
import ConstructorInfo from './ConstructorInfo'
import ErrorPage from '../Components/ErrorPage'

import api from '../Utils/api'

export default class ConstructorScreen extends React.Component {
  static propTypes = {
    navigation: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      error: false,
      team: null,
      drivers: null,
      isLoading: true,
    }
  }

  _getData() {
    return Promise.all([
      api.getConstructorDetails({teamId: this.props.navigation.state.params.team.Constructor.constructorId}),
      api.getConstructorDrivers({teamId: this.props.navigation.state.params.team.Constructor.constructorId}),
    ]).then(promise => {
      this.setState({
        isLoading: false,
        team: promise[0],
        drivers: promise[1]
      })
    }).catch(err => {
      console.log('Error', err)
      this.setState({
        isLoading: false,
        error: true,
        team: null,
        drivers: null
      })
    })
  }

  componentWillMount() {
    this._getData()
  }

  render() {
    const team = this.props.navigation.state.params.team

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableHighlight
              style={styles.btn}
              onPress={() => this.props.navigation.goBack()}>
              <Image
                style={styles.btnLeft}
                source={require('../../assets/images/btn-back.png')} />
            </TouchableHighlight>
            <ScalableText style={styles.title}>F1 {team.Constructor.name}</ScalableText>
          </View>
          <ActivityIndicator
            animating={this.state.isLoading}
            style={[styles.centering, {height: 80}]}
            size="large" />
        </View>
      )
    } else if (!this.state.isLoading && this.state.error) {
      return (
        <ErrorPage />
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableHighlight
              style={styles.btn}
              onPress={() => this.props.navigation.goBack()}>
              <Image
                style={styles.btnLeft}
                source={require('../../assets/images/btn-back.png')} />
            </TouchableHighlight>
            <ScalableText style={styles.title}>F1 {team.Constructor.name}</ScalableText>
          </View>
          <ScrollView style={styles.content}>
            <ConstructorInfo
              teamId={this.props.navigation.state.params.team.Constructor.constructorId}
              championship={this.state.team.championship}
              wins={this.state.team.wins}
              races={this.state.team.races}
              polePosition={this.state.team.polePosition}
            />
            <View style={styles.info}>
              <Avatar
                code={this.state.drivers[0].code}
              />
              <DriverInfo
                code={this.state.drivers[0].code}
                firstName={this.state.drivers[0].familyName}
                lastName={this.state.drivers[0].givenName}
                number={this.state.drivers[0].permanentNumber}
                country={this.state.drivers[0].nationality}
                dob={this.state.drivers[0].dateOfBirth}
                races={this.state.drivers[0].races}
                championship={this.state.drivers[0].championship}
                victories={this.state.drivers[0].wins}
                polePosition={this.state.drivers[0].polePosition}
              />
            </View>
            <View style={styles.divider}></View>
            <View style={styles.info}>
              <DriverInfo
                code={this.state.drivers[1].code}
                firstName={this.state.drivers[1].familyName}
                lastName={this.state.drivers[1].givenName}
                number={this.state.drivers[1].permanentNumber}
                country={this.state.drivers[1].nationality}
                dob={this.state.drivers[1].dateOfBirth}
                races={this.state.drivers[1].races}
                championship={this.state.drivers[1].championship}
                victories={this.state.drivers[1].wins}
                polePosition={this.state.drivers[1].polePosition}
              />
              <Avatar
                code={this.state.drivers[1].code}
              />
            </View>
          </ScrollView>
        </View>
      )
    }
  }

  _onRefresh = () => {
    console.log('test')
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  header: {
    backgroundColor: '#202930',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60
  },
  btnLeft: {
    height: 40,
    width: 40
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold'
  },
  divider: {
    height: 1,
    backgroundColor: '#fff',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
  },
})
