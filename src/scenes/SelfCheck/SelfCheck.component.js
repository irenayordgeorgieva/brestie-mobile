import React, { Component } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Icon from '../../components/Icon/Icon'
import styles from './SelfCheck.style'
import * as vu from '../../utils/viewport-units'

class SelfCheck extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => 
      <Icon name="list-alt" type="font-awesome" style={{ fontSize:24 }} color={tintColor} />
    ,
    drawerLabel: 'Наръчник за профикактика'
  };

  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      data: [
        {
          image: require('../../assets/images/1.png'),
          text: 'Застанете пред огледалото с ръце на кръста. Огледайте за следните признаци: набръчкване или подуване на кожата, промяна във формата на зърното (дали е обърнато навътре, вместо да стърчи навън), зачервяване, болезненост или обрив. Ако установите някои от тези признаци, свържете се с Вашия лекар.'
        },
        {
          image: require('../../assets/images/2.png'),
          text: 'Застанете пред огледалото с вдигнати ръце и огледайте за зачервявания, обрив, подуване, промяна във формата на гърдата, поява на секрет от едното или двете зърна.'
        },
        {
          image: require('../../assets/images/3.png'),
          text: 'Почувствайте гърдите си, докато лежите, използвайки дясната си ръка, за да усетите лявата си гърда, а след това лявата ви ръка, за да усетите дясната си гърда. С леки въртеливи движения, проверете цалата си гърда. Можете да започнете от зърното, като се движите в по-големи и по-големи кръгове, докато стигнете до външния ръб на гърдата. Можете също така да проверите гърдата си чрез преместване на пръстите си отгоре надолу. '
        },
        {
          image: require('../../assets/images/4.png'),
          text: 'Застанете пред огледалото с ръце на кръста. Огледайте за следните признаци: набръчкване или подуване на кожата, промяна във формата на зърното (дали е обърнато навътре, вместо да стърчи навън), зачервяване, болезненост или обрив. Ако установите някои от тези признаци, свържете се с Вашия лекар.'
        }
      ]
    }
  }

  portraitView = () => {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.imageContainer}>
          <Image 
            resizeMode="center" 
            source={this.state.data[this.state.current].image} 
            style={styles.image}/>
        </View>
        <Text style={[ styles.text ]}>{this.state.data[this.state.current].text}</Text>
        <View style={styles.NavigationContainer}>
          <TouchableOpacity
            disabled={this.state.current === 0}
            onPress={() => this.setState({current: this.state.current - 1})}
            style={[
              styles.NavButtons, 
              styles.NavButtonsPortrait,
              this.state.current === 0 ? styles.NavButtonsDisabled : undefined
            ]}
          >
            <Icon color="white" name="arrow-back" size={vu.vmax(5)} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={this.state.current === this.state.data.length - 1}
            onPress={() => this.setState({current: this.state.current + 1})}
            style={[
              styles.NavButtons, 
              styles.NavButtonsPortrait,
              this.state.current === this.state.data.length - 1 ? styles.NavButtonsDisabled : undefined 
            ]}
          >
            <Icon color="white" name="arrow-forward" size={vu.vmax(5)} />
          </TouchableOpacity>
        </View>
      </View>
      )
  } 

  landscapeView = () => {
    return (
      <View style={styles.MainContainerLandscape}>
        <View style={styles.NavigationContainer}>
          <TouchableOpacity
            disabled={this.state.current === 0}
            onPress={() => this.setState({current: this.state.current - 1})}
            style={[
              styles.NavButtons, 
              styles.NavButtonsLandscape,
              this.state.current === 0 ? styles.NavButtonsDisabled : undefined
            ]}
          >
            <Icon color="white" name="arrow-back" size={vu.vmax(5)} />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image 
            resizeMode="center" 
            source={this.state.data[this.state.current].image} 
            style={styles.image}/>
        </View>
        <View style={styles.textContainerLandscape}>
          <Text style={[ styles.text, styles.textLandscape ]}>{this.state.data[this.state.current].text}</Text>
        </View>
        <View style={styles.NavigationContainer}>
          <TouchableOpacity
            disabled={this.state.current === this.state.data.length - 1}
            onPress={() => this.setState({current: this.state.current + 1})}
            style={[
              styles.NavButtons, 
              styles.NavButtonsLandscape,
              this.state.current === this.state.data.length - 1 ? styles.NavButtonsDisabled : undefined 
            ]}
          >
            <Icon color="white" name="arrow-forward" size={vu.vmax(5)} />
          </TouchableOpacity>
        </View>
      </View>
      )
  } 

  render() {    
    return this.props.orientation === 'portrait' 
      ? this.portraitView() 
      : this.landscapeView()
  }
}

SelfCheck.propTypes = {
  orientation: PropTypes.string
}

const mapStateToProps = state => {
  return {
    orientation: state.orientation
  }
};

export default connect(mapStateToProps)(SelfCheck)
