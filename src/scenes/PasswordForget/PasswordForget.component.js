import * as fieldValidation from '../../utils/field-validation'
import * as vu from '../../utils/viewport-units'
import { Alert, Keyboard, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Component } from 'react'
import Button from '../../components/Button/Button'
import Icon from '../../components/Icon/Icon'
import PropTypes from 'prop-types'
import colors from '../../utils/color-pallette'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import { userChanged } from '../SignIn/SignIn.actions'

const styles = StyleSheet.create({
  headings: {
    fontSize: vu.vmax(4),
    margin: vu.vmax(1),
    marginBottom: vu.vmax(2),
    padding: 0
  },
  icon: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.pink,
    flex: 0,
    height: vu.vh(20),
    justifyContent: 'center',
    width: vu.vh(20)
  },
  registerButtonDisabled: {
    backgroundColor: colors.alto
  },
  registerButtonEnabled: {
    backgroundColor: colors.pink
  },
  scrollViewContainer: {
    alignContent: 'center',
    backgroundColor: colors.white,
    flexGrow: 1,
    justifyContent: 'center',
    paddingLeft: vu.vmax(4),
    paddingRight: vu.vmax(4)
  },
  textInputs: {
    borderBottomColor: colors.pink,
    borderBottomWidth: vu.vmax(0.2),
    fontSize: vu.vmax(2.8),
    margin: vu.vmax(1),
    padding: 0
  },
  textLabels: {
    fontSize: vu.vmax(2.3),
    margin: vu.vmax(1),
    padding: 0
  }
})


class SignUp extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: undefined,
      emailValid: undefined,
      keyboardShown: false
    }
  }
  
  componentDidMount () {
    const { navigation, userChanged: updateUser } = this.props

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', 
      () => this.setState({ keyboardShown: true })
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide', 
      () => this.setState({ keyboardShown: false })
    )

    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      updateUser(user)

      if (user) {
        navigation.navigate('AppScreen')
      } else {
        navigation.navigate('AuthScreen')
      }
    })
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
    
    if (this.unsubscriber) {
      this.unsubscriber()
    }
  }

  validateEmail = (e) => {
    const emailValid = fieldValidation.isEmailAddressValid(e)

    this.setState({
      email: emailValid ? e : undefined,
      emailValid
    })
  }

  registerButtonDisabled = () => {
    const { emailValid } = this.state
    return !emailValid
  }

  sendPasswordResetEmail = async () => {
    const { email } = this.state
    const { navigation } = this.props

    try {
      await firebase.auth().sendPasswordResetEmail(email)
      Alert.alert('Успешно', 'Моля проверете имейл адреса си.', 
      [
        {
          onPress: () => {
            navigation.goBack()
          },
          style: 'close',
          text: 'Разбрах'
        }
      ])
    } catch(err) {
      Alert.alert('Възникна грешка', err.message,
      [
        {
          style: 'close',
          text: 'Разбрах'
        }
      ])
    }
  }

  render() {
    const { keyboardShown, emailValid } = this.state

    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {
          keyboardShown
            ? undefined
            : <View style={styles.icon}>
                <Icon color="white" name="awareness-ribbon" size={vu.vmax(15)} type="entypo" />
              </View>
        }
        <Text style={styles.headings}>Забравена парола</Text>
        <Text style={styles.textLabels}>Имейл</Text>
        <TextInput keyboardType="email-address" onChangeText={this.validateEmail} style={styles.textInputs} />
        {
          emailValid === false
            ? <Text>Невалиден имейл адрес!</Text>
            : undefined
        }
        <Button
          containerStyle={styles.registerButtonEnabled}
          disabled={this.registerButtonDisabled()}
          disabledContainerStyle={styles.registerButtonDisabled}
          onPress={() => this.sendPasswordResetEmail}
          title={'Възстановяване на паролата'}
          />
      </ScrollView>
    )
  }
}

SignUp.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  userChanged: PropTypes.func.isRequired
}

const mapStateToProps = () => ({
})

export default connect(
  mapStateToProps,
  { userChanged }
)(SignUp)
