/* @flow */
/* eslint no-undef: "error" */
/* eslint-env node */
import React from 'react'

import {
  View,
  Image,
  StyleSheet,
} from 'react-native'

import Dimensions from 'Dimensions'

const { width } = Dimensions.get('window')

export default class Avatar extends React.Component {
  static propTypes = {
    code: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.flex}>
        <View style={styles.avatarBox}>
          <Image
            style={styles.avatar}
            source={{uri: `https://s3-eu-west-1.amazonaws.com/f1-storage/Drivers/${this.props.code}.jpg`}}/>
          <Image
            style={styles.helmet}
            source={{uri: `https://s3-eu-west-1.amazonaws.com/f1-storage/Helmet/${this.props.code}.png`}}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  avatarBox: {
    backgroundColor: '#bebebe'
  },
  avatar: {
    width: width/2,
    resizeMode: 'contain',
    height: width/2,
  },
  helmet: {
    width: width/2,
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    resizeMode: 'contain',
  }
})
