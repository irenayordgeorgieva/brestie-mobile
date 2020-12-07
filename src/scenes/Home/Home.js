import * as vu from '../../utils/viewport-units'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from '../../components/Icon/Icon'
import colors from '../../utils/color-pallette'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center'
  },
  icon: {
    fontSize: 24
  }
})

export default class Home extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => <Icon color={tintColor} name="home" style={styles.icon} type="font-awesome" />,
    drawerLabel: 'Начало'
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon color="pink" name="awareness-ribbon" size={vu.vmin(70)} type="entypo" />
      </View>
    )
  }
}
