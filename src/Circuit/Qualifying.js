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

import moment from 'moment'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})

class QualifyingScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      error: false,
      qualifyingResults: [],
      refreshing: false,
      isComing: false
    }

    // Bind internal functions, necessary in ES6 + React
    this.renderRow = this.renderRow.bind(this)
  }

  getQualifyingResults() {
    const { season, round } = this.props

    api.getQualifyingResults(season, round)
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
            refreshing: false,
            error: false,
            isComing: false,
            qualifyingResults: ds.cloneWithRows(res)
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
    this.getQualifyingResults()
  }

  render() {
    const { routeName } = this.props.navigation.state
    const { date, time } = this.props
    const { isLoading, error, isComing, qualifyingResults } = this.state

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
      const ciruitDate = moment(`${date} ${time}`).subtract(1, 'd')

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
            dataSource={ qualifyingResults }
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
    this.getQualifyingResults()
  }

  renderRow(rowData) {

    return (
      <View style={ styles.driver }>
        <ScalableText style={ styles.position }>{ rowData.position }</ScalableText>
        <View style={ styles.info }>
          <ScalableText style={ styles.name }><ScalableText style={ styles.number }>{ rowData.Driver.permanentNumber }</ScalableText> { rowData.Driver.givenName } { rowData.Driver.familyName }</ScalableText>
          <ScalableText style={ styles.teamConstructor }>{ rowData.Constructor.name }</ScalableText>
        </View>
        <View style={ styles.status }>
          <View style={ styles.statusBox }>
            <ScalableText style={ styles.statusTxt }>Q1:</ScalableText>
            <ScalableText style={ styles.statusTime }>{ rowData.Q1 }</ScalableText>
          </View>
          <View style={ styles.statusBox }>
            <ScalableText style={ styles.statusTxt}>Q2:</ScalableText>
            <ScalableText style={[ styles.statusTime, rowData.Q2 ? '' : styles.textCenter ]}>
              { rowData.Q2 ? rowData.Q2 : '- -' }
            </ScalableText>
          </View>
          <View style={ styles.statusBox }>
            <ScalableText style={ styles.statusTxt }>Q3:</ScalableText>
            <ScalableText style={[ styles.statusTime, rowData.Q3 ? '' : styles.textCenter ]}>
              { rowData.Q3 ? rowData.Q3 : '- -' }
            </ScalableText>
          </View>
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
    justifyContent: 'center',
    color: '#f94057',
    lineHeight: Platform.OS === 'ios' ? 50 : 36,
    marginRight: 10,
    width: 20
  },
  info: {
    flex: 1,
    paddingTop: 10
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
  statusBox: {
    flexDirection: 'row'
  },
  statusTxt: {
    width: 27,
    fontFamily: 'Raleway-Medium',
    color: '#f94057'
  },
  statusTime: {
    flex: 1,
    textAlign: 'right',
    fontFamily: 'Raleway-SemiBold',
    color: '#444'
  },
  textCenter: {
    textAlign: 'center'
  }
})

QualifyingScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  season: PropTypes.string.isRequired,
  round: PropTypes.string.isRequired,
  date: PropTypes.string,
  time: PropTypes.string
}

module.exports = QualifyingScreen
