import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import PrimaryNavigation from './navigation/PrimaryNavigation'
import { connect } from 'react-redux'
import { toPortraitOrientation, toLandscapeOrientation } from './App.actions'

class App extends Component {
  componentWillMount() {
    this.orientationChange()
    Dimensions.addEventListener('change', () => {this.orientationChange()})
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change')
  }

  orientationChange = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.props.toPortraitOrientation()
    }
    else {
      this.props.toLandscapeOrientation()
    }
  }

  render() {
    return (
      <PrimaryNavigation />
    );
  }
}

App.propTypes = {
  toPortraitOrientation: PropTypes.func,
  toLandscapeOrientation: PropTypes.func,
  orientation: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    appstate: state.appstate
  }
}

export default connect(mapStateToProps, { toPortraitOrientation, toLandscapeOrientation })(App)
