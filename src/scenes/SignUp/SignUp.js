import React, { Component } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import Icon from '../../components/Icon/Icon'
import * as vu from '../../utils/viewport-units'
import * as fieldValidation from '../../utils/field-validation'
import * as NativeBase from 'native-base'


export default class SignUp extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

  constructor(props) {
    super(props)
    
    this.state = {
      email: undefined,
      password: undefined,
      keyboardShown: false,
      emailValid: undefined,
      passwordValid: undefined,
      passwordsMatch: undefined
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

  validateEmail = (e) => {
    const emailValid = fieldValidation.isEmailAddressValid(e)

    this.setState({
      emailValid,
      email: emailValid ? e : undefined
    })
  }

  validatePassword = (e) => {
    const passwordValid = fieldValidation.isPasswordValid(e)

    this.setState({
      passwordValid,
      password: passwordValid ? e : undefined
    })
  }

  validatePasswordConfirmation = (e) => {
    this.setState({
      passwordsMatch: e === this.state.password
    })
  }

  registerButtonDisabled = () => {
    return !(this.state.emailValid && this.state.passwordValid && this.state.passwordsMatch)
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
        <Text style={styles.Headings}>Регистрация</Text>
        <Text style={styles.TextLabels}>Имейл</Text>
        <TextInput keyboardType='email-address' onChangeText={this.validateEmail} style={styles.TextInputs} />
        {this.state.emailValid === false
          ? <Text>Невалиден имейл адрес!</Text>
          : undefined
        }
        <Text style={styles.TextLabels}>Парола</Text>
        <TextInput onChangeText={this.validatePassword} secureTextEntry={true} style={styles.TextInputs} />
        {this.state.passwordValid === false
          ? <Text>Паролата трябва да бъде дълга поне 6 символа!</Text>
          : undefined
        }
        <Text style={styles.TextLabels}>Повторете паролата</Text>
        <TextInput onChangeText={this.validatePasswordConfirmation} secureTextEntry={true} style={styles.TextInputs} />
        {this.state.passwordsMatch === false
          ? <Text>Паролите не съвпадат!</Text>
          : undefined
        }
        <Button buttonStyle={styles.ButtonsEnabled} disabled={this.registerButtonDisabled()} disabledStyle={styles.ButtonsDisabled} title={'Регистрация'} />
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
