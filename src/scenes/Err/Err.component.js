import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Err extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

  render() {
    return (
      <View>
        <Text>Възникна грешка</Text>
      </View>
    )
  }
}
