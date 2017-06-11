/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  StyleSheet,
  ListView,
  ActivityIndicator,
  RefreshControl,
  Platform
} from 'react-native'

import ScalableText from 'react-native-text'

import StatsHeader from './StatsHeader'
import api from '../Utils/api'
import ErrorPage from '../Components/ErrorPage'
import ComingSoon from '../Components/ComingSoon'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})

class ResultsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      error: false,
      raceResults: [],
      refreshing: false,
      isComing: false
    }

    // Bind internal functions, necessary in ES6 + React
    this.renderRow = this.renderRow.bind(this)
  }

  getRaceResults() {
    const { season, round } = this.props

    api.getRaceResults(season, round)
      .then((res) => {
        if (res.errorMessage || res.message || res.err) {
          this.setState({
            isLoading: false,
            refreshing: false,
            error: false,
            isComing: true
          })
        } else {
          this.setState({
            isLoading: false,
            error: false,
            refreshing: false,
            isComing: false,
            raceResults: ds.cloneWithRows(res)
          })
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          refreshing: false,
          error: true,
          isComing: false
        })
      })
  }

  componentWillMount() {
    this.getRaceResults()
  }

  render() {
    const { routeName } = this.props.navigation.state
    const { date, time } = this.props
    const { isLoading, raceResults, error, isComing } = this.state

    if (isLoading) {
      return (
        <View style={ styles.container }>
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
    } else if (!isLoading && isComing) {
      const ciruitDate = `${date} ${time}`

      return (
        <ComingSoon endDate={ ciruitDate }/>
      )
    } else if (!isLoading && !isComing) {

      return (
        <View style={ styles.container }>
          <StatsHeader name={ routeName } />
          <ListView
            style={ styles.results }
            refreshControl={ this.refreshControl() }
            dataSource={ raceResults }
            renderRow={ this.renderRow } />
        </View>
      )
    }
  }

  refreshControl() {
    return (
      <RefreshControl
        refreshing={ this.state.refreshing }
        onRefresh={ () => this.refreshListView() } />
    )
  }

  refreshListView() {
    this.setState({ refreshing: true })
    this.getRaceResults()
  }

  renderRow(rowData) {

    return (
      <View style={ styles.driver }>
        <ScalableText style={ styles.position }>{ rowData.position }</ScalableText>
        <View style={ styles.info }>
          <ScalableText style={ styles.name }>
            <ScalableText style={ styles.number }>{ rowData.Driver.permanentNumber }</ScalableText> { rowData.Driver.givenName } { rowData.Driver.familyName }
          </ScalableText>
          <ScalableText style={ styles.teamConstructor }>{ rowData.Constructor.name }</ScalableText>
        </View>
        <View style={ styles.status }>
          <ScalableText style={ styles.statusTime }>{ rowData.Time ? rowData.Time.time : rowData.status }</ScalableText>
          <ScalableText style={ styles.points }>{ rowData.points ? rowData.points : '0' }</ScalableText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  driver: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6'
  },
  position: {
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: '#f94057',
    lineHeight: Platform.OS === 'ios' ? 38 : 28,
    width: 20,
    height: 38,
    marginRight: 10
  },
  info: {
    flex: 1
  },
  number: {
    color: '#f94057'
  },
  name: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: '#444'
  },
  teamConstructor: {
    fontFamily: 'Raleway-Medium',
    fontSize: 12,
    lineHeight: 12,
    color: '#819cad',
    paddingTop: 5
  },
  status: {
    width: 95
  },
  statusTime: {
    fontFamily: 'Raleway-SemiBold',
    textAlign: 'right',
    color: '#444'
  },
  points: {
    fontFamily: 'Raleway-Medium',
    textAlign: 'right',
    fontSize: 12,
    lineHeight: 14,
    color: '#819cad',
    paddingTop: 2
  }
})

ResultsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  season: PropTypes.string.isRequired,
  round: PropTypes.string.isRequired,
  date: PropTypes.string,
  time: PropTypes.string
}

module.exports = ResultsScreen
