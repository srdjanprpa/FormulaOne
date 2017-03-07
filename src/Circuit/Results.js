/* @flow */
import React from 'react'

import {
  View,
  Text,
  StyleSheet,
  ListView,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native'

import StatsHeader from './StatsHeader'
import api from '../Utils/api'
import ErrorPage from '../Components/ErrorPage'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})

export default class ResultsScreen extends React.Component {
  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
    info: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      error: false,
      raceResults: [],
      refreshing: false
    }
  }

  _getRaceResults() {
    const detail = this.props.info

    api.getRaceResults({season: detail.season, round: detail.round})
      .then((res) => {
        this.setState({
          isLoading: false,
          error: false,
          refreshing: false,
          raceResults: ds.cloneWithRows(res.MRData.RaceTable.Races[0].Results)
        })
      })
      .catch(() => {
        console.log('uso ovde')
        this.setState({
          isLoading: false,
          refreshing: false,
          error: true,
        })
      })
  }

  componentWillMount() {
    this._getRaceResults()
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
    } else if (!this.state.isLoading && this.state.raceResults.length === 0 && this.state.error) {
      return (
        <ErrorPage />
      )
    } else {
      return (
        <View style={styles.container}>
          <StatsHeader name={this.props.navigation.state.routeName} />
          <ListView
            style={styles.results}
            refreshControl={this._refreshControl()}
            dataSource={this.state.raceResults}
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
    this.setState({refreshing: true})
    this._getRaceResults()
  }

  renderRow(rowData) {
    let driverStatus
    let points = ''
    if (rowData.Time) {
      driverStatus = rowData.Time.time
    } else {
      driverStatus = rowData.status
    }

    if (rowData.points !== '0') {
      points = rowData.points
    }

    return (
      <View style={styles.driver}>
        <Text style={styles.position}>{rowData.position}</Text>
        <View style={styles.info}>
          <Text style={styles.name}>
            <Text style={styles.number}>{rowData.Driver.permanentNumber}</Text> {rowData.Driver.givenName} {rowData.Driver.familyName}
          </Text>
          <Text style={styles.teamConstructor}>{rowData.Constructor.name}</Text>
        </View>
        <View style={styles.status}>
          <Text style={styles.statusTime}>{ driverStatus }</Text>
          <Text style={styles.points}>{ points }</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
    width: 30,
    height: 38,
    marginRight: 10,
  },
  info: {
    flex: 1,
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
    width: 80,
  },
  statusTime: {
    fontFamily: 'Raleway-SemiBold',
    textAlign: 'right',
    color: '#444',
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
