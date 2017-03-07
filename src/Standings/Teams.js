/* @flow */
import React from 'react'

import {
  View,
  Text,
  StyleSheet,
  ListView,
  ActivityIndicator,
  AsyncStorage,
  RefreshControl
} from 'react-native'

import moment from 'moment'

import StatsHeader from './StatsHeader'
import api from '../Utils/api'
import ErrorPage from '../Components/ErrorPage'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})

export default class TeamsScreen extends React.Component {
  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      error: false,
      teams: [],
      refreshing: false
    }
  }

  _getTeams() {
    api.getConstructorStandings()
      .then((teamsStandings) => {
        const teams = {
          standings: teamsStandings.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
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
          this._getTeams()
          return
        }
        const teams = JSON.parse(value)
        if (moment().unix() > teams.expireTime) {
          this._getTeams()
        } else {
          this.setState({
            isLoading: false,
            teams: ds.cloneWithRows(teams.standings)
          })
        }
      })
      .catch(() => {
        this._getTeams()
      })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <StatsHeader name={this.props.navigation.state.routeName} />
          <ActivityIndicator
            animating={this.state.isLoading}
            style={[styles.centering, {height: 80}]}
            size="large" />
        </View>
      )
    } else if (!this.state.isLoading && this.state.teams.length === 0 && this.state.error) {
      return (
        <ErrorPage />
      )
    } else {
      return (
        <View style={styles.container}>
          <StatsHeader name={this.props.navigation.state.routeName} />
          { this.state.teams && this.state.teams._cachedRowCount > 0 && this.state.error ?
            <View style={styles.errMsg}><Text style={styles.errMsgTxt}>Unable to load new data!</Text></View> :
            <View></View>
          }
          <ListView
            style={styles.teams}
            refreshControl={this._refreshControl()}
            dataSource={this.state.teams}
            renderRow={this.renderRow.bind(this)} />
        </View>
      )
    }
  }

  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>this._refreshListView()} />
    )
  }

  _refreshListView() {
    // Start Rendering Spinner
    this.setState({refreshing: true})
    this._getTeams()
  }

  renderRow(rowData) {
    return (
      <View style={styles.team}>
        <Text style={styles.numberTxt}>{rowData.position}</Text>
        <View style={styles.info}>
          <Text style={styles.teamConstructor}>{rowData.Constructor.name}</Text>
        </View>
        <View style={styles.winsBox}><Text style={styles.wins}>{rowData.wins}</Text></View>
        <View style={styles.pointsBox}><Text style={styles.points}>{rowData.points}</Text></View>
      </View>
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
    height: 16,
  },
  errMsgTxt: {
    fontSize: 10,
    fontFamily: 'Raleway-Medium',
    color: '#fff',
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
    width: 30,
    marginRight: 10,
    justifyContent: 'center',
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: '#f94057',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  teamConstructor: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 16,
    color: '#444'
  },
  winsBox: {
    width: 45,
    justifyContent: 'center',
  },
  wins: {
    width: 45,
    textAlign: 'center',
    fontFamily: 'Raleway-Medium',
    fontSize: 16
  },
  pointsBox: {
    width: 50,
    justifyContent: 'center',
  },
  points: {
    color: '#f94057',
    fontFamily: 'Raleway-SemiBold',
    textAlign: 'right',
    fontSize: 16,
  }
})
