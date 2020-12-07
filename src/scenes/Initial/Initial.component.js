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
  }
})

export default class Initial extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon color="pink" name="awareness-ribbon" size={vu.vmin(70)} type="entypo" />
      </View>
    )
  }
}
