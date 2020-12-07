import * as vu from '../utils/viewport-units'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import RadioButton from './RadioButton'

const styles = StyleSheet.create({
  QuestionsView: {
    flex: 0
  }
})

class RadioList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: props.entries,
      value: props.value
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      entries: props.entries,
      value: props.value
    })
  }

  mapCheckBoxList() {
    const { entries, value } = this.state
    const { style, onPress } = this.props

    return entries.map(entry => {
      return (
        <RadioButton
          key={`option-view-${entry.id}`}
          onPress={() => onPress(entry.id)}
          style={style}
          text={entry.text}
          value={value === entry.id} />
      )
    })
  }

  render() {
    return (
      <View style={styles.QuestionsView}>
        {this.mapCheckBoxList()}
      </View>
    )
  }
}

RadioList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
    iconColor: PropTypes.string,
    spaceBetweenHorizontal: PropTypes.number,
    spaceBetweenVertical: PropTypes.number
  }),
  value: PropTypes.number
}

RadioList.defaultProps = {
  entries: [],
  style: {
    color: 'black',
    fontSize: vu.vmax(2),
    iconColor: 'black',
    spaceBetweenHorizontal: vu.vmax(1),
    spaceBetweenVertical: vu.vmax(1)
  },
  value: null
}

export default RadioList 
