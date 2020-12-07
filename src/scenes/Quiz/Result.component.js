import * as vu from '../../utils/viewport-units'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PropTypes } from 'prop-types'
import { calculateRisk } from './Result.actions'
import colors from '../../utils/color-pallette'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  conclusion: {
    color: colors.mineShaft,
    fontFamily: 'Ubuntu-Regular',
    fontSize: vu.vmax(3),
    paddingBottom: vu.vmin(5)
  },
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  icon: {
    color: colors.mineShaft,
    fontFamily: 'fa-regular-400',
    fontSize: vu.vmin(30),
    textAlign: 'center'
  },
  iconLandscape: {
    marginRight: vu.vmax(4)
  },
  sticky: {
    alignItems: 'stretch',
    backgroundColor: colors.pink,
    color: colors.pink,
    margin: vu.vmax(4),
    padding: vu.vmax(4)
  },
  stickyLandscape: {
    flexDirection: 'row'
  },
  textContainerLandscape: {
    flex: 1
  },
  tips: {
    color: colors.mineShaft,
    fontFamily: 'Ubuntu-Regular',
    fontSize: vu.vmax(2.3)
  },
  tipsHeading: {
    alignContent: 'center',
    color: colors.mineShaft,
    fontFamily: 'Ubuntu-Regular',
    fontSize: vu.vmax(3),
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
})

class Result extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { calculateRisk: calculate } = this.props

    calculate()
  }

  componentWillUpdate() {
    const { result } = this.props

    this.getWeightWord(result)
  }

  getWeightWord = (weight) => {
    if (weight <= 30) {
      return {
        emoji: '\uf118',
        resultText: 'нисък'
      }
    } else if (weight <= 60) {
      return {
        emoji: '\uf11a',
        resultText: 'средно висок'
      }
    }
    return {
      emoji: '\uf119',
      resultText: 'висок'
    }
  }

  render() {
    const { result, orientation } = this.props
    const { emoji, resultText } = this.getWeightWord(result)

    return (
      <View style={styles.container}>
        <View style={{ ...styles.sticky, 
          ...orientation === 'landscape' ? styles.stickyLandscape : undefined }}>
          <View style={orientation === 'landscape' ? styles.iconLandscape : undefined}>
            <Text style={styles.icon}>{emoji}</Text>
          </View>
          <View style={orientation === 'landscape' ? styles.textContainerLandscape : undefined}>
            <Text style={styles.conclusion}>{`Вие имате ${resultText} риск от заболяване от рак на гърдата`}</Text>
            <Text style={styles.tipsHeading}>Съвети:</Text>
            <Text style={styles.tips}>- Консултирайте се със специалист поне веднъж на две години.</Text>
            <Text style={styles.tips}>- Преглеждайте сама гърдите си поне веднъж месечно.</Text>
          </View>
        </View>
      </View>
    )
  }
}

Result.propTypes = {
  calculateRisk: PropTypes.func.isRequired,
  orientation: PropTypes.string,
  result: PropTypes.number
}

Result.defaultProps = {
  orientation: 'portrait',
  result: null
}

const mapStateToProps = state => {
  return {
    orientation: state.orientation,
    result: state.quiz.result
  }
}

export default connect(mapStateToProps, { calculateRisk })(Result)
