/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Platform,
  ActivityIndicator,
  ScrollView
} from 'react-native'

import ScalableText from 'react-native-text'

import Avatar from './Avatar'
import DriverInfo from './DriverInfo'
import ConstructorInfo from './ConstructorInfo'
import ErrorPage from '../Components/ErrorPage'

import api from '../Utils/api'

class ConstructorScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isRefreshing: false,
      error: false,
      team: null,
      drivers: null,
      isLoading: true
    }
  }

  getData() {
    const { constructorId } = this.props.navigation.state.params.constructor.Constructor

    return Promise.all([
      api.getConstructorDetails(constructorId),
      api.getConstructorDrivers(constructorId)
    ]).then((promise) => {
      this.setState({
        isLoading: false,
        team: promise[0],
        drivers: promise[1]
      })
    }).catch(() => {
      this.setState({
        isLoading: false,
        error: true,
        team: null,
        drivers: null
      })
    })
  }

  componentWillMount() {
    this.getData()
  }

  render() {
    const { name, constructorId } = this.props.navigation.state.params.constructor.Constructor
    const { isLoading, error } = this.state

    if (isLoading) {
      return (
        <View style={ styles.container }>
          <View style={ styles.header }>
            <TouchableHighlight
              style={ styles.btn }
              onPress={ () => this.props.navigation.goBack() }>
              <Image
                style={ styles.btnLeft }
                source={ require('../../assets/images/btn-back.png') } />
            </TouchableHighlight>
            <ScalableText style={ styles.title }>F1 { name }</ScalableText>
          </View>
          <ActivityIndicator
            animating={ isLoading }
            style={[ styles.centering, {height: 80} ]}
            size="large" />
        </View>
      )
    } else if (!isLoading && error) {
      return (
        <ErrorPage />
      )
    } else {
      const { team: { championship, wins, races, polePosition }, drivers } = this.state

      const teamsDriver = drivers.map(function(driver, index) {
        if ( index % 2 ) {
          return (
            <View
              key={ driver.code }
              style={ styles.info }>
              <DriverInfo
                code={ driver.code }
                firstName={ driver.familyName }
                lastName={ driver.givenName }
                number={ driver.permanentNumber }
                nationality={ driver.nationality }
                dob={ driver.dateOfBirth }
                races={ driver.races }
                championship={ driver.championship }
                wins={ driver.wins }
                polePosition={ driver.polePosition }
                podiums={ driver.podiums }
                stylePosition={ 'left' }
              />
              <Avatar
                code={ driver.code }
                stylePosition={ 'right' }
              />
            </View>
          )
        } else {
          return (
            <View
              key={ driver.code }
              style={ styles.info }>
              <Avatar
                code={ driver.code }
                stylePosition={ 'left' }
              />
              <DriverInfo
                code={ driver.code }
                firstName={ driver.familyName }
                lastName={ driver.givenName }
                number={ driver.permanentNumber }
                nationality={ driver.nationality }
                dob={ driver.dateOfBirth }
                races={ driver.races }
                championship={ driver.championship }
                wins={ driver.wins }
                polePosition={ driver.polePosition }
                podiums={ driver.podiums }
                stylePosition={ 'right' }
              />
            </View>
          )
        }

      })

      return (
        <Image source={require('../../assets/images/bg-constructor.jpg')} style={ styles.backgroundImage }>
          <View style={ styles.container }>
            <View style={ styles.header }>
              <TouchableHighlight
                style={ styles.btn }
                onPress={ () => this.props.navigation.goBack() }>
                <Image
                  style={ styles.btnLeft }
                  source={ require('../../assets/images/btn-back.png') } />
              </TouchableHighlight>
              <ScalableText style={ styles.title }>F1 { name }</ScalableText>
            </View>
            <ScrollView style={ styles.content}>
              <Image
                style={ styles.teamCar }
                source={{ uri: `https://s3-eu-west-1.amazonaws.com/f1-storage/Cars/${ constructorId }.jpg` }}/>
              <ConstructorInfo
                championship={ championship }
                wins={ wins }
                races={ races }
                polePosition={ polePosition }
              />
              { teamsDriver }
            </ScrollView>
          </View>
        </Image>
      )
    }
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#fff'
  },
  hr: {
    height: 1,
    backgroundColor: '#f1f2f6',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  teamCar: {
    height: 60,
    width: 220,
    // marginLeft: 20,
    resizeMode: 'contain'
  },
  container: {
    flex: 1
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
    flex: 1
  },
  title: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold'
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10
  }
})

ConstructorScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

module.exports = ConstructorScreen
