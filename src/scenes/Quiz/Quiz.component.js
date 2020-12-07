import * as vu from '../../utils/viewport-units'
import { Alert, Animated, Easing, ImageBackground,
  ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { fetchQuestions, nextQuestion, previousQuestion, questionAnswerChange } from './Quiz.actions'
import CheckList from '../../components/CheckList'
import Icon from '../../components/Icon/Icon'
import Loading from '../Loading/Loading.component'
import { PropTypes } from 'prop-types'
import RadioList from '../../components/RadioList'
import colors from '../../utils/color-pallette'
import { connect } from 'react-redux'

const background = require('../../assets/images/quiz-background.png')

const styles = StyleSheet.create({
  drawerIcon: {
    fontSize:24
  },
  headerBackground: {
    borderRadius: vu.vmax(50),
    height: vu.vmax(100),
    overflow: 'hidden',
    position: 'absolute',
    width: vu.vmax(100)
  },
  headerBackgroundLandscape: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    right: 0
  },
  headerBackgroundPortrait: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'flex-end'
  },
  headerContainer: {
    justifyContent: 'center'
  },
  headerContainerLandscape: {
    marginRight: vu.vmax(2),
    width: vu.vmax(25)
  },
  headerContainerPortrait: {
    alignItems: 'center',
    height: vu.vmax(25),
    marginBottom: vu.vmax(2)
  },
  headerIcon: {
    flex: 0,
    margin: vu.vmax(5)
  },
  headerImageBackground: {
    height: vu.vw(200),
    resizeMode: 'repeat',
    width: vu.vw(200)
  },
  infoIcon: {
    margin: vu.vmax(1.5)
  },
  mainContainer: {
    alignContent: 'center',
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'space-between',
    padding: 0
  },
  mainContainerLandscape: {
    flexDirection: 'row'
  },
  mainContainerPortrait: {
    flexDirection: 'column'
  },
  navButtons: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.pink,
    justifyContent: 'center',
    margin: 0,
    padding: vu.vmax(1),
    zIndex: 1
  },
  navButtonsDisabled: {
    backgroundColor: colors.gray
  },
  navButtonsEnabled: {
    backgroundColor: colors.pink
  },
  navButtonsLandscape: {
    flex: 0
  },
  navButtonsPortrait: {
    flex: 1
  },
  navigationContainer: {
    alignContent: 'stretch',
    flex: 0,
    flexDirection: 'row'
  },
  question: {
    alignItems: 'flex-start',
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'Ubuntu-Regular',
    fontSize: vu.vmax(3.2),
    justifyContent: 'center'
  },
  questionContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  quizContainer: {
    flex: 1
  },
  quizContainerLandscape: {
    marginTop: vu.vmax(2)
  },
  quizContainerPortrait: {
    paddingLeft: vu.vmax(4)
  }
})


class Quiz extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => 
      <Icon color={tintColor} name="question-circle" style={styles.drawerIcon} type="font-awesome" />
    ,
    drawerLabel: 'Въпросник'
  }

  constructor(props) {
    super(props)

    this.state = {
      animIconOpacity: new Animated.Value(0),
      animIconScale: new Animated.Value(0),
      animIconSpin: new Animated.Value(0)
    }
  }

  async componentWillMount() {
    const { question, fetchQuestions: getQuestions } = this.props
  
    if (!question) {
      await getQuestions()
    }
  }

  componentDidMount() {
    this.startAnimation()
  }

  startAnimation = () => {
    const { animIconOpacity, animIconSpin, animIconScale } = this.state
    animIconOpacity.setValue(0)
    animIconSpin.setValue(0)
    animIconScale.setValue(0)

    Animated.parallel([
      Animated.timing(
        animIconOpacity,
        { duration: 1000, easing: Easing.ease, toValue: 1 }
      ),
      Animated.timing(
        animIconSpin, 
        { duration: 1000, easing: Easing.ease, toValue: 1 }
      ),
      Animated.timing(
        animIconScale, 
        { duration: 1000, easing: Easing.ease, friction: 1, toValue: 1 }
      )
    ]).
    start()    
  }

  answerChange = (optionId, optionIndex) => {
    const { questionAnswerChange: changeAnswer } = this.props

    changeAnswer(optionId, optionIndex)
  };

  iconView = () => {
    const { orientation, question } = this.props
    const { animIconOpacity, animIconSpin } = this.state
    const { iconName, iconType } = question

    return (
      <View style={[
        styles.headerContainer, 
        orientation === 'portrait' ? styles.headerContainerPortrait : styles.headerContainerLandscape
        ]}>
        <ImageBackground
          imageStyle={styles.headerImageBackground} 
          source={background} 
          style={[
            styles.headerBackground,
            orientation === 'portrait' ? styles.headerBackgroundPortrait : styles.headerBackgroundLandscape
          ]}
        >
          <Animated.View
            style={{
              opacity: animIconOpacity,
              transform: [
                {
                  rotate: animIconSpin.interpolate({
                    inputRange: [ 0, 1 ],
                    outputRange: [ '0deg', '360deg' ]
                  })
                },
                {
                  scale: animIconSpin.interpolate({
                    inputRange: [ 0, 1 ],
                    outputRange: [ 0, 1 ]
                  })
                }
              ]
            }}
          >
            <Icon
              color="#e93d77"
              iconStyle={styles.headerIcon}
              name={iconName}
              size={vu.vmax(15)}
              type={iconType}
            />
          </Animated.View>
        </ImageBackground>
      </View>
    )
  };

  questionOptions = () => {
    const { question, answer } = this.props
    const listStyle = {
      fontColor: colors.black,
      fontSize: vu.vmax(2.3),
      iconColor: colors.pink,
      spaceBetweenHorizontal: vu.vmax(1),
      spaceBetweenVertical: vu.vmax(1)
    }

    switch (question.type) {
      case 'multiple':
        return (
          <CheckList
            entries={question.options}
            onPress={this.answerChange}
            style={listStyle}
            values={question.answer}
          />
        )
      case 'single':
        return (
          <RadioList
            entries={question.options}
            onPress={this.answerChange}
            style={listStyle}
            value={answer}
          />
        )
      default:
        return null
    }
  };

  questionView = () => {
    const { orientation, question } = this.props
    const { iconName, iconType } = question

    return (
      <View
        style={{
          ...styles.quizContainer,
          ...orientation === 'portrait'
            ? styles.quizContainerPortrait
            : styles.quizContainerLandscape
        }}
      >
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{question.text}</Text>
          <Icon
            color="pink"
            iconStyle={styles.infoIcon}
            name="info-circle"
            onPress={() =>
              Alert.alert('Защо е важно?', question.info, [
                { style: 'close', text: 'Разбрах' }
              ])
            }
            size={vu.vmax(3)}
            type="font-awesome"
          />
        </View>
        <ScrollView>{this.questionOptions()}</ScrollView>
      </View>
    )
  };

  previousQuestion = () => {
    const { previousQuestion: previous } = this.props

    return () => {
      previous()
      this.startAnimation()
    }
  }

  nextQuestion = () => {
    const { nextQuestion: next } = this.props

    return () => {
      next()
      this.startAnimation()
    }
  }

  landscapeOrientationView = () => {
    const { prev, next } = this.props

    return (
      <View
        style={{ ...styles.mainContainer, ...styles.mainContainerLandscape }}
      >
        <View 
          style={styles.navigationContainer}>
          <TouchableOpacity
            disabled={!prev}
            onPress={this.previousQuestion()}
            style={{ 
              ...styles.navButtons, 
              ...styles.navButtonsLandscape,
              ...prev
                ? styles.navButtonsEnabled
                : styles.navButtonsDisabled
            }}
          >
            <Icon color="white" name="arrow-back" size={vu.vmax(5)} />
          </TouchableOpacity>
        </View>
        {this.iconView()}
        {this.questionView()}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            disabled={!next}
            onPress={this.nextQuestion()}
            style={{ 
              ...styles.navButtons, 
              ...styles.navButtonsPortrait,
              ...next
                ? styles.navButtonsEnabled
                : styles.navButtonsDisabled 
            }}
          >
            <Icon color="white" name="arrow-forward" size={vu.vmax(5)} />
          </TouchableOpacity>
        </View>
      </View>
    )
  };

  portraitOrientationView = () => {
    const { prev, next } = this.props

    return (
      <View
        style={{ ...styles.mainContainer, ...styles.mainContainerPortrait }}
      >
        {this.iconView()}
        {this.questionView()}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            disabled={!prev}
            onPress={this.previousQuestion()}
            style={{ 
              ...styles.navButtons, 
              ...styles.navButtonsPortrait,
              ...prev
                ? styles.navButtonsEnabled
                : styles.navButtonsDisabled 
            }}
          >
            <Icon color="white" name="arrow-back" size={vu.vmax(5)} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!next}
            onPress={this.nextQuestion()}
            style={{ 
              ...styles.navButtons, 
              ...styles.navButtonsPortrait,
              ...next
                ? styles.navButtonsEnabled
                : styles.navButtonsDisabled 
            }}
          >
            <Icon color="white" name="arrow-forward" size={vu.vmax(5)} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  getContent = () => {
    const { prev, question, orientation, navigation } = this.props

    switch (true) {
      case !!question:
        return orientation === 'portrait'
          ? this.portraitOrientationView()
          : this.landscapeOrientationView()
      case prev && !question:
        navigation.navigate('Result')
        return null
      default:
        return <Loading />
    }
  }

  render() {
    return this.getContent()
  }
}

Quiz.propTypes = {
  answer: PropTypes.number,
  fetchQuestions: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  next: PropTypes.bool.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  orientation: PropTypes.string,
  prev: PropTypes.bool.isRequired,
  previousQuestion: PropTypes.func.isRequired,
  question: PropTypes.objectOf(PropTypes.any),
  questionAnswerChange: PropTypes.func.isRequired
}

Quiz.defaultProps = {
  answer: null,
  orientation: 'portrait',
  question: null
}

const mapStateToProps = state => {
  return {
    answer: state.quiz.info.currentAnswer,
    next: !!state.quiz.info.currentAnswer,
    orientation: state.orientation,
    prev: state.quiz.info.passed.length > 0,
    question: state.quiz.questions[state.quiz.info.currentQuestion]
  }
}

export default connect(
  mapStateToProps,
  { fetchQuestions, nextQuestion, previousQuestion, questionAnswerChange }
)(Quiz)
