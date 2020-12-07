import * as vu from '../../utils/viewport-units'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})

export default class Loading extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="pink" size={vu.vmin(20)} />
      </View>
    )
  }
}
