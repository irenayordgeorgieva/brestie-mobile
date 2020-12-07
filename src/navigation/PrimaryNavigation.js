import { Platform, StyleSheet, View } from 'react-native'
import DrawerNavigation from './DrawerNavigation'
import Icon from '../components/Icon/Icon'
import React from 'react'
import { createStackNavigator } from 'react-navigation'

const styles = StyleSheet.create({
  headerLeftContainer: {
    paddingLeft: 10
  }
})

export default createStackNavigator({
  //loginStack: { screen: LoginStack },
  drawerStack: {
    initialRouteName: 'drawerStack',
    navigationOptions: ({ navigation}) => ({
      // Default config for all screens
      headerLeft: <View style={styles.headerLeftContainer}>
        <Icon name="menu" onPress={() => navigation.toggleDrawer()} size={30} />
      </View>,
      headerStyle: {
        backgroundColor: 'pink',
        height: Platform.OS === 'ios' ? 70 : 70 - 24,
        margin: 0
      },
      headerTitle: 'Brestie',
      headerTitleStyle: {
        fontWeight: 'bold',
        margin: 0,
        padding: 0
      },
      title: 'Brestie'
    }),
    screen: DrawerNavigation
  }
}, {
  headerMode: 'screen'
  })
