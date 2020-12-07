import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import App from './src/App.component'
import { name as appName } from './app.json'
import {store, persistor} from './src/store'
import Home from './src/scenes/Home/Home'

class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Home />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppContainer);
