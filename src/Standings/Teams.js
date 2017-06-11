/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  View,
  StyleSheet,
  ListView,
  ActivityIndicator,
  AsyncStorage,
  RefreshControl,
  TouchableOpacity
} from 'react-native'

import ScalableText from 'react-native-text'
import moment from 'moment'

import StatsHeader from './StatsHeader'
import api from '../Utils/api'
import ErrorPage from '../Components/ErrorPage'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})

class TeamsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      error: false,
      teams: [],
      refreshing: false
    }
  }

  getTeams() {
    api.getConstructorStandings()
      .then((teamsStandings) => {
        const teams = {
          standings: teamsStandings,
          expireTime: moment().add(1, 'h').unix()
        }

        AsyncStorage.setItem('teamsStandings', JSON.stringify(teams))
          .then(() => {
            this.setState({
              isLoading: false,
              refreshing: false,
              error: false,
              teams: ds.cloneWithRows(teams.standings)
            })
          })
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
    AsyncStorage.getItem('teamsStandings')
      .then((value) => {
        if (!value) {
          this.getTeams()

          return
        }

        const teams = JSON.parse(value)

        if ( moment().unix() > teams.expireTime ) {
          this.getTeams()
        } else {
          this.setState({
            isLoading: false,
            teams: ds.cloneWithRows(teams.standings)
          })
        }
      })
      .catch(() => {
        this.getTeams()
      })
  }

  render() {
    const { navigation: { state } } = this.props
    const { isLoading, teams, error } = this.state

    if ( isLoading ) {
      return (
        <View style={ styles.container }>
          <StatsHeader name={ state.routeName } />
          <ActivityIndicator
            animating={ isLoading }
            style={[ styles.centering, {height: 80} ]}
            size="large" />
        </View>
      )
    } else if ( !isLoading && teams.length === 0 && error ) {
      return (
        <ErrorPage />
      )
    } else {
      return (
        <View style={ styles.container }>
          <StatsHeader name={ state.routeName } />
          { teams && teams._cachedRowCount > 0 && error ?
            <View style={ styles.errMsg }><ScalableText style={ styles.errMsgTxt }>Unable to load new data!</ScalableText></View> :
            <View></View>
          }
          <ListView
            style={ styles.teams }
            refreshControl={ this._refreshControl() }
            dataSource={ teams }
            renderRow={ this.renderRow.bind(this) } />
        </View>
      )
    }
  }

  _refreshControl() {
    return (
      <RefreshControl
        refreshing={ this.state.refreshing }
        onRefresh={ () => this._refreshListView() } />
    )
  }

  _refreshListView() {
    // Start Rendering Spinner
    this.setState({ refreshing: true })
    this.getTeams()
  }

  renderRow(rowData) {
    return (
      <TouchableOpacity style={ styles.team } onPress={ () => this.props.teams(rowData) }>
        <ScalableText style={ styles.numberTxt }>{ rowData.position }</ScalableText>
        <View style={ styles.info }>
          <ScalableText style={ styles.teamConstructor }>{ rowData.Constructor.name }</ScalableText>
        </View>
        <View style={ styles.winsBox }><ScalableText style={ styles.wins }>{ rowData.wins }</ScalableText></View>
        <View style={ styles.pointsBox }><ScalableText style={ styles.points }>{ rowData.points }</ScalableText></View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  errMsg: {
    flexDirection: 'row',
    backgroundColor: '#f94057',
    alignItems: 'center',
    justifyContent: 'center',
    height: 16
  },
  errMsgTxt: {
    fontSize: 10,
    fontFamily: 'Raleway-Medium',
    color: '#fff'
  },
  team: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6'
  },
  numberTxt: {
    width: 35,
    marginRight: 10,
    justifyContent: 'center',
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: '#f94057'
  },
  info: {
    flex: 1,
    justifyContent: 'center'
  },
  teamConstructor: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    color: '#444'
  },
  winsBox: {
    width: 45,
    justifyContent: 'center'
  },
  wins: {
    width: 45,
    textAlign: 'center',
    fontFamily: 'Raleway-Medium',
    fontSize: 16
  },
  pointsBox: {
    width: 50,
    justifyContent: 'center'
  },
  points: {
    color: '#f94057',
    fontFamily: 'Raleway-SemiBold',
    textAlign: 'right',
    fontSize: 16
  }
})

TeamsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  teams: PropTypes.func.isRequired
}

module.exports = TeamsScreen
