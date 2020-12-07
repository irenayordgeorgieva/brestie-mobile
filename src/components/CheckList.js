import * as vu from '../utils/viewport-units'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import CheckBox from './CheckBox'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  questionsView: {
    flex: 0
  }
})

class CheckList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: props.entries,
      values: props.values
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      entries: props.entries,
      values: props.values
    })
  }

  mapCheckBoxList() {
    const { entries, values } = this.state
    const { style, onPress } = this.props

    return entries.map((entry, i) => {
      return (
        <CheckBox
          key={`option-view-${i}`}
          onPress={() => onPress(values ^ 1 << i)}
          style={style}
          text={entry}
          value={(values >> i) % 2} />
      )
    })
  }

  render() {
    return (
      <View style={styles.questionsView}>
        {this.mapCheckBoxList()}
      </View>
    )
  }
}

CheckList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.string),
  onPress: PropTypes.func,
  style: PropTypes.style,
  values: PropTypes.number
}

CheckList.defaultProps = {
  entries: [],
  onPress: () => { },
  style: {
    color: 'black',
    fontSize: vu.vmax(2),
    iconColor: 'black',
    spaceBetweenHorizontal: vu.vmax(1),
    spaceBetweenVertical: vu.vmax(1)
  },
  values: 0
}

export default CheckList 
