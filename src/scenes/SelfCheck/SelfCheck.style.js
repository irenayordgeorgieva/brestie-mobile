import { StyleSheet } from 'react-native'
import * as vu from '../../utils/viewport-units'

export default StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flexDirection: 'column'
  },
  MainContainerLandscape: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 0,
    flexDirection: 'row'
  },
  textContainerLandscape: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    alignSelf: 'center',
    margin: vu.vmax(2)
  },
  text: {
    flex: 0,
    marginLeft: vu.vmax(2),
    marginRight: vu.vmax(2),
    marginBottom: vu.vmax(2),
    fontFamily: 'Ubuntu-Regular',
    fontSize: vu.vmax(2)
  },
  NavigationContainer: {
    flex: 0,
    flexDirection: 'row',
    alignContent: 'stretch'
  },
  NavButtons: {
    margin: 0,
    backgroundColor: 'pink',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: vu.vmax(1)
  },
  NavButtonsEnabled: {
    backgroundColor: 'pink'
  },
  NavButtonsDisabled: {
    backgroundColor: 'gray'
  },
  NavButtonsPortrait: {
    flex: 1
  },
  NavButtonsLandscape: {
    flex: 0
  },
})
