import * as vu from '../utils/viewport-units'
import React, { Component } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Icon from '../components/Icon/Icon'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  checkElement: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 0,
    flexDirection: 'row'
  }
})

class CheckList extends Component {
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
    const { style, onPress } = this.props
    const { text, value } = this.state
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
        <View style={[ styles.checkElement, { margin: style.spaceBetweenHorizontal } ]}>
          <Icon
            color={style.iconColor}
            name={value ? 'check-square' : 'square'}
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

CheckList.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.style,
  text: PropTypes.string,
  value: PropTypes.number
}

CheckList.defaultProps = {
  text: '',
  value: null
}

CheckList.defaultProps = {
  onPress: () => { },
  style: {
    fontColor: 'black',
    fontSize: vu.vmax(2),
    iconColor: 'black',
    spaceBetweenHorizontal: vu.vmax(1),
    spaceBetweenVertical: vu.vmax(1)
  }
}

export default CheckList 
