import {
  Text as NativeText,
  Platform,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import getIconType from './getIconType'

const styles = StyleSheet.create({
  button: {
    margin: 7
  },
  // eslint-disable-next-line react-native/no-color-literals
  disabled: {
    backgroundColor: '#D1D5D8'
  },
  raised: {
    ...Platform.select({
      android: {
        elevation: 2
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
      }
    })
  }
})

const Icon = props => {
  const {
    type,
    name,
    size,
    color,
    iconStyle,
    underlayColor,
    reverse,
    raised,
    containerStyle,
    reverseColor,
    disabled,
    disabledStyle,
    onPress,
    Component = onPress ? TouchableHighlight : View,
    ...attributes
  } = props

  const IconComponent = getIconType(type)
  const getBackgroundColor = () => {
    if (reverse) {
      return color
    }

    return raised ? 'white' : 'transparent'
  }

  return (
    <View style={containerStyle && containerStyle}>
      <Component
        {...attributes}
        style={StyleSheet.flatten([
          (reverse || raised) && styles.button,
          (reverse || raised) && {
            borderRadius: size + 4,
            height: size * 2 + 4,
            width: size * 2 + 4
          },
          raised && styles.raised,
          {
            alignItems: 'center',
            backgroundColor: getBackgroundColor(),
            justifyContent: 'center'
          },
          disabled && styles.disabled,
          disabled && disabledStyle
        ])}
        underlayColor={reverse ? color : underlayColor || color}
        {...onPress && { disabled }}
        onPress={onPress}
      >
        <IconComponent
          color={reverse ? reverseColor : color}
          name={name}
          size={size}
          style={StyleSheet.flatten([
            { backgroundColor: 'transparent' },
            iconStyle && iconStyle
          ])}
          testID="iconIcon"
        />
      </Component>
    </View>
  )
}

Icon.propTypes = {
  Component: PropTypes.func.isRequired,
  color: PropTypes.string,
  containerStyle: PropTypes.style,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.style,
  iconStyle: NativeText.propTypes.style,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  raised: PropTypes.bool,
  reverse: PropTypes.bool,
  reverseColor: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.string,
  underlayColor: PropTypes.string
}

Icon.defaultProps = {
  color: 'black',
  containerStyle: null,
  disabled: false,
  disabledStyle: null,
  iconStyle: null,
  onPress: null,
  raised: false,
  reverse: false,
  reverseColor: 'white',
  size: 24,
  type: 'material',
  underlayColor: 'white'
}

export default Icon
