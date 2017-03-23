/* @flow */
/* eslint no-undef: "error" */
/* eslint-env node */
import React from 'react'

import {
  View,
  StyleSheet,
  ListView,
  ActivityIndicator,
  AsyncStorage,
  RefreshControl,
  Platform,
  Image,
} from 'react-native'

import ScalableText from 'react-native-text'
import moment from 'moment'

import StatsHeader from './StatsHeader'
import api from '../Utils/api'
import ErrorPage from '../Components/ErrorPage'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})

export default class DriversScreen extends React.Component {
  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      error: false,
      drivers: [],
      refreshing: false
    }
  }

  _getDrivers() {
    api.getDriverStandings()
      .then((driversStandings) => {
        const drivers = {
          standings: driversStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings,
          expireTime: moment().add(1, 'h').unix()
        }

        AsyncStorage.setItem('driversStandings', JSON.stringify(drivers))
          .then(() => {
            this.setState({
              isLoading: false,
              refreshing: false,
              error: false,
              drivers: ds.cloneWithRows(drivers.standings)
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
    AsyncStorage.getItem('driversStandings')
      .then((value) => {
        if (!value) {
          this._getDrivers()
          return
        }
        const drivers = JSON.parse(value)
        if (moment().unix() > drivers.expireTime) {
          this._getDrivers()
        } else {
          this.setState({
            isLoading: false,
            drivers: ds.cloneWithRows(drivers.standings)
          })
        }
      })
      .catch(() => {
        this._getDrivers()
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
    } else if (!this.state.isLoading && this.state.drivers.length === 0 && this.state.error) {
      return (
        <ErrorPage />
      )
    } else {
      return (
        <View style={styles.container}>
          <StatsHeader name={this.props.navigation.state.routeName} />
          { this.state.drivers && this.state.drivers._cachedRowCount > 0 && this.state.error ?
            <View style={styles.errMsg}><ScalableText style={styles.errMsgTxt}>Unable to load new data!</ScalableText></View> :
            <View></View>
          }
          <ListView
            style={styles.drivers}
            refreshControl={this._refreshControl()}
            dataSource={this.state.drivers}
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
    this._getDrivers()
  }

  renderRow(rowData) {
    return (
      <View style={styles.driver}>
        <View style={styles.avatarBox}>
          <Image style={styles.avatar}
                 source={{uri: `https://s3-eu-west-1.amazonaws.com/f1-storage/Drivers/${rowData.Driver.code}.jpg`}}/>
          <ScalableText style={styles.avatarTxt}>{rowData.position}</ScalableText>
        </View>
        <View style={styles.info}>
          <ScalableText style={styles.name}>
            <ScalableText style={styles.number}>{rowData.Driver.permanentNumber}</ScalableText> {rowData.Driver.givenName} {rowData.Driver.familyName}
          </ScalableText>
          <ScalableText style={styles.teamConstructor}>{rowData.Constructors[0].name}</ScalableText>
        </View>
        <View style={styles.winsBox}><ScalableText style={styles.wins}>{rowData.wins}</ScalableText></View>
        <View style={styles.pointsBox}>
          <ScalableText style={styles.points}>{rowData.points}</ScalableText>
            <Image style={styles.flag}
                   source={{uri: `https://s3-eu-west-1.amazonaws.com/f1-storage/Flags/${rowData.Driver.nationality}.png`}}/>
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
  drivers: {
    flex: 1
  },
  driver: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6'
  },
  avatarBox: {
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: 10,
    position: 'relative',
    zIndex: 10,
    top: 3,
  },
  avatar: {
    position: 'relative',
    top: 0,
    right: 0,
    zIndex: 2,
    width: 35,
    height: 35
  },
  avatarTxt: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#f94057',
    lineHeight: Platform.OS === 'ios' ? 40 : 30,
    width: 30,
    height: 40,
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
  winsBox: {
    width: 45,
    height: 40
  },
  wins: {
    width: 45,
    height: 40,
    textAlign: 'center',
    fontFamily: 'Raleway-Medium',
    fontSize: 16
  },
  pointsBox: {
    width: 50,
    height: 40,
    alignItems: 'flex-end'
  },
  points: {
    color: '#f94057',
    fontFamily: 'Raleway-SemiBold',
    textAlign: 'right',
    fontSize: 16,
    lineHeight: 20
  },
  flag: {
    height: 11,
    width: 16,
    marginTop: 3,
    alignItems: 'flex-end'
  }
})
