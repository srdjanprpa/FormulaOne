/* @flow */
/* eslint no-undef: "error" */
/* eslint-env node */
import React from 'react'

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Platform
} from 'react-native'

export default class HomeHeader extends React.Component {
  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
    title: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.header}>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('DrawerOpen')}>
          <Image
            style={styles.btnLeft}
            source={require('../../assets/images/btn-menu.png')} />
        </TouchableHighlight>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#202930',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnLeft: {
    height: 60,
    width: 60
  },
  title: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 18,
    fontFamily: 'Raleway-SemiBold'
  }
})
