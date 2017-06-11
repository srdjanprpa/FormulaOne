/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView
} from 'react-native'

import api from '../Utils/api'
import ErrorPage from '../Components/ErrorPage'
import InfoBox from './InfoBox'
import LapRecord from './LapRecord'
import LatestChampionship from './LatestChampionship'

const { width } = Dimensions.get('window')

class InfoScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      error: false,
      refreshing: false,
      info: {}
    }
  }

  getInfo(circuitId) {
    const status = { isLoading: false, refreshing: false, error: false }

    api.getCircuitInfo(circuitId)
      .then((res) => {
        if (res.errorMessage || res.message) {
          this.setState(status)
        } else {
          this.setState({
            info: res,
            ...status
          })
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          refreshing: false,
          error: true
        })
      })
  }

  componentWillMount() {
    this.getInfo(this.props.circuitId)
  }

  render() {
    const { isLoading, error } = this.state

    if (isLoading) {
      return (
        <View style={ styles.flex }>
          <ActivityIndicator
            animating={ isLoading }
            style={[
              styles.centering,
              { height: 80 }
            ]}
            size="large" />
        </View>
      )
    } else if (!isLoading && error) {
      return (
        <ErrorPage />
      )
    } else {
      const { firstGP, laps, length, raceDistance, fastestLap, latestChampionship, circuitId } = this.state.info

      return (
        <ScrollView style={ styles.flex }>
          <Image
            style={ styles.circuit }
            source={{uri: `https://s3-eu-west-1.amazonaws.com/f1-storage/Cirius/${ circuitId }.png`}}/>
          <View style={ styles.row }>
            <View style={ styles.flex }>
              <InfoBox
                textFirstLine='Number'
                textSecoundLine='of laps'
                textInfo={ laps }/>

              <InfoBox
                textFirstLine='Fist'
                textSecoundLine='Grand Prix'
                textInfo={ firstGP }/>
            </View>
            <View style={ styles.flex }>
              <InfoBox
                textFirstLine='Cicuit'
                textSecoundLine='Length (km)'
                textInfo={ length }/>

              <InfoBox
                textFirstLine='Race'
                textSecoundLine='Distance (km)'
                textInfo={ raceDistance }/>
            </View>
          </View>
          <LapRecord
            time={ fastestLap.time }
            firstName={ fastestLap.familyName }
            lastName={ fastestLap.givenName }
            year={ fastestLap.season }
            constructorName={ fastestLap.driverConstructor }
            averageSpeed={ fastestLap.averageSpeed }
          />
          <LatestChampionship
            time={ latestChampionship.time }
            firstName={ latestChampionship.givenName }
            lastName={ latestChampionship.familyName }
            constructorName={ latestChampionship.driverConstructor }
            averageSpeed={ latestChampionship.averageSpeed }
          />
          <View style={{ height: 40 }}></View>
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  flex: {
    flex: 1
  },
  circuit: {
    width: width - 20,
    height: (width - 20) / 1.532934131736527,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  }
})

InfoScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  season: PropTypes.string.isRequired,
  round: PropTypes.string.isRequired,
  circuitId: PropTypes.string.isRequired
}

module.exports = InfoScreen
