import * as vu from '../utils/viewport-units'
import React, { Component } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Icon from '../components/Icon/Icon'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  radioElement: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 0,
    flexDirection: 'row'
  }
})

class RadioButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.text,
      value: props.value
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      text: props.text,
      value: props.value
    })
  }

  render() {
    const { text, value } = this.state
    const { style, onPress } = this.props

    
    const additionalStyles = StyleSheet.create({
      text: {
        color: style.fontColor,
        fontFamily: 'Ubuntu-Regular',
        fontSize: style.fontSize,
        marginLeft: style.spaceBetweenVertical
      }
    })

    return (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <View style={[ styles.radioElement, { margin: style.spaceBetweenHorizontal } ]}>
          <Icon
            color={style.iconColor}
            name={value ? 'dot-circle' : 'circle'}
            size={style.fontSize}
            type="font-awesome" />
          <Text
            style={additionalStyles.text}>
            {text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

RadioButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
    iconColor: PropTypes.string,
    spaceBetweenHorizontal: PropTypes.number,
    spaceBetweenVertical: PropTypes.number
  }),
  text: PropTypes.string,
  value: PropTypes.bool
}

RadioButton.defaultProps = {
  onPress: () => { },
  style: {
    color: 'black',
    fontSize: vu.vmax(2),
    iconColor: 'black',
    spaceBetweenHorizontal: vu.vmax(1),
    spaceBetweenVertical: vu.vmax(1)
  },
  text: '',
  value: null
}

export default RadioButton 
