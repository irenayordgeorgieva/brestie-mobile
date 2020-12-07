import * as vu from '../utils/viewport-units'
import { DrawerItems, createDrawerNavigator } from 'react-navigation'
import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import Err from '../scenes/Err/Err.component'
import Home from '../scenes/Home/Home'
import Icon from '../components/Icon/Icon'
import Loading from '../scenes/Loading/Loading.component'
import Quiz from '../scenes/Quiz/Quiz.component'
import Reminders from '../scenes/Reminders/Reminders.component'
import Result from '../scenes/Quiz/Result.component'
import SelfCheck from '../scenes/SelfCheck/SelfCheck.component'
import SignIn from '../scenes/SignIn/SignIn'
import SignUp from '../scenes/SignUp/SignUp'
import colors from '../utils/color-pallette'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: colors.pink,
    height: vu.vh(20),
    justifyContent: 'center'
  }
})

class CustomDrawer extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon color="white" name="awareness-ribbon" size={vu.vh(15)} type="entypo" />
        </View>
        <View>
          <ScrollView>
            <DrawerItems {...this.props} />
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

export default createDrawerNavigator({
  Err,
  Home,
  Loading,
  Quiz,
  Reminders,
  Result,
  SelfCheck,
  SignIn,
  SignUp
}, {
    contentComponent: CustomDrawer,
    contentOptions: {
      activeBackgroundColor: colors.gray,
      activeTintColor: colors.pink,
      iconContainerStyle: {
        marginHorizontal: 5,
        marginVertical: 3
      },
      labelStyle: {
        marginHorizontal: 5,
        marginVertical: 3
      }
    },
    initialRouteName: 'Home'
  })
