import React from 'react'
import { Component } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import Icon from '../../components/Icon/Icon'
import * as vu from '../../utils/viewport-units'
import * as NativeBase from 'native-base'

export default class SignIn extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

  constructor(props) {
    super(props)
    
    this.state = {
      keyboardShown: false,
      email: undefined,
      password: undefined
    }
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', 
      () => this.setState({ keyboardShown: true })
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide', 
      () => this.setState({ keyboardShown: false })
    )
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  loginButtonDisabled = () => {
    return !(this.state.email && this.state.password)
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        {this.state.keyboardShown
          ? undefined
          : <View style={{
            backgroundColor: 'pink',
            width: vu.vh(20),
            height: vu.vh(20),
            flex: 0,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center'
          }}>
          <Icon color='white' name='awareness-ribbon' size={vu.vmax(15)} type='entypo' />
        </View>
        }
        <Text style={styles.Headings}>Вход</Text>
        <Text style={styles.TextLabels}>Имейл</Text>
        <TextInput keyboardType='email-address' onChangeText={(e) => this.setState({email: e})} style={styles.TextInputs} />
        <Text style={styles.TextLabels}>Парола</Text>
        <TextInput onChangeText={(e) => this.setState({password: e})} secureTextEntry={true} style={styles.TextInputs} />
        <Button buttonStyle={styles.ButtonsEnabled} disabled={this.loginButtonDisabled()} disabledStyle={styles.ButtonsDisabled} title="Вход" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ButtonsDisabled: {

  },
  ButtonsEnabled: {
    backgroundColor: 'pink'
  },
  Headings: {
    fontSize: vu.vmax(4),
    padding: 0,
    margin: vu.vmax(1),
    marginBottom: vu.vmax(2)
  },
  Images: {
    width: vu.vh(20)
  },
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    paddingLeft: vu.vmax(4),
    paddingRight: vu.vmax(4)
  },
  TextInputs: {
    fontSize: vu.vmax(2.8),
    padding: 0,
    margin: vu.vmax(1),
    borderBottomWidth: vu.vmax(0.2),
    borderBottomColor: 'pink'
  },
  TextLabels: {
    fontSize: vu.vmax(2.3),
    padding: 0,
    margin: vu.vmax(1)
  }
})
