/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DateBetween from '../Utils/DateBetween'
import moment from 'moment'

import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import ScalableText from 'react-native-text'

class ComingSoon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      remaining: false
    }
  }

  componentDidMount() {
    this.tick()
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    let startDate = moment(new Date()).unix()
    let endDate = moment(this.props.endDate).unix()
    let remaining = DateBetween(startDate, endDate)

    if (remaining[0] === '00' && remaining[1] === '00' && remaining[2] === '00') {
      window.clearInterval(this.interval)
    }

    this.setState({
      remaining: remaining ? remaining : false
    })
  }


  render() {
    const timer = (time) => {
      if (time[0] === '00' && time[1] === '00' && time[2] === '00') {
        return (
          <View>
            <ScalableText style={ styles.txt }> Data coming soon! </ScalableText>
          </View>
        )
      } else if (time) {
        return (
          <View>
            <ScalableText style={ styles.txt }>Race is coming for</ScalableText>
            <View style={ styles.timerBox }>
              <View style={ styles.timerTxt }>
                <ScalableText style={ styles.timer }>{time[0]}</ScalableText>
                <ScalableText style={ styles.txtTimer }>DAYS</ScalableText>
              </View>
              <View style={ styles.timerTxt }>
                <ScalableText style={ styles.timer }> : {time[1]}</ScalableText>
                <ScalableText style={ styles.txtTimer }>HOURS</ScalableText>
              </View>
              <View style={ styles.timerTxt }>
                <ScalableText style={ styles.timer }> : {time[2]}</ScalableText>
                <ScalableText style={ styles.txtTimer }>MINUTES</ScalableText>
              </View>
            </View>
          </View>
        )
      }
    }

    return (
      <View style={ styles.container }>
        { timer(this.state.remaining) }
        <Image style={ styles.type }
               source={ require('../../assets/images/no-data.jpg') } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timerBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  timerTxt: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  container: {
    flex: 1,
    backgroundColor: '#333333',
    paddingTop: 20
  },
  txtTimer: {
    fontFamily: 'Raleway-Medium',
    fontSize: 10,
    lineHeight: 10,
    color: '#fff'
  },
  txt: {
    fontFamily: 'Raleway-Medium',
    fontSize: 14,
    lineHeight: 22,
    color: '#fff',
    textAlign: 'center'
  },
  timer: {
    fontSize: 50,
    lineHeight: 50,
    color: '#fff',
    fontFamily: 'TransponderAOE'
  },
  type: {
    width: null,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 40,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    position: 'relative',
    flex: 1
  }
})

ComingSoon.propTypes = {
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number
  ])
}

module.exports = ComingSoon
