import { ActivityIndicator, Modal, Text } from 'react-native'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import colors from '../../utils/color-pallette'

export default class LoadingModal extends Component {
  render() {
    const { text, visible } = this.props

    return (
      <Modal presentationStyle="formSheet" visible={visible}>
        <ActivityIndicator color={colors.pink} size="large" />
        {text ? <Text>{text}</Text> : null}
      </Modal>
    )
  }
}

LoadingModal.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool.isRequired
}

LoadingModal.defaultProps = {
  text: null
}
