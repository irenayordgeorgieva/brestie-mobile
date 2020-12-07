import * as vu from '../../utils/viewport-units'
import { DatePickerAndroid, Picker, StyleSheet, Switch, Text, 
  TimePickerAndroid, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Icon from '../../components/Icon/Icon'
import colors from '../../utils/color-pallette'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  drawerIcon: {
    fontSize: 24
  },
  mainContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'flex-start'
  },
  reminderContainer: {
    borderBottomWidth: vu.vmin(0.5),
    borderColor: colors.gray
  },
  reminderHeaderContainer: {
    alignItems: 'center',
    backgroundColor: colors.alto,
    borderBottomWidth: vu.vmin(0.2),
    borderColor: colors.gray,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: vu.vmax(1)
  },
  settingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: vu.vmax(2)
  },
  settingOptionText: {
    color: colors.black,
    fontFamily: 'Ubuntu-Regular',
    fontSize: vu.vmax(2.2),
    fontWeight: 'bold'
  },
  settingOptionTouchableOpacity: {
    borderBottomWidth: vu.vmax(0.1),
    borderColor: colors.black,
    flexDirection: 'row'
  },
  settingText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: vu.vmax(2)
  },
  text: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: vu.vmax(2.3)
  }
})

class Reminders extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => 
      <Icon color={tintColor} name="bell" style={styles.drawerIcon} type="font-awesome" />
    ,
    drawerLabel: 'Напомняния'
  };

  constructor(props) {
    super(props)

    this.state = {
      appointmentSwitch: false,
      appointmentTime: new Date(),
      selfCheckSwitch: false,
      selfCheckTime: new Date(),
      selfCheckWeeks: '1',
      selfCheckWeeksOptions: [ '1', '2', '3', '4' ]
    }
  }

  timePicker = async (hours = 9, minutes = 0) => {
    const { action, hour, minute } = await TimePickerAndroid.open({
      hour: hours,
      is24Hour: true,
      minute: minutes,
      mode: 'spinner'
    })

    if (action !== TimePickerAndroid.dismissedAction) {
      return { hour, minute }
    }

    return null
  }

  datePicker = async (date = new Date()) => {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: date,
      mode: 'spinner'
    })

    if (action !== DatePickerAndroid.dismissedAction) {
      return { day, month, year }
    }

    return null
  }

  timeToString = (time) => {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    
    return `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}`
  }

  dateToString = (date) => {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return `${day > 9 ? day : `0${day}`}.${month > 9 ? month : `0${month}`}.${year}`
  }

  reminderSetToast = (time, weeks) => {
    const date = new Date(time)
    if (weeks) {
      date.setDate(date.getDate() + weeks * 7)
    }
    ToastAndroid.show(`Следващо напомняне\nна ${this.dateToString(date)} от ${this.timeToString(date)} ч.`, ToastAndroid.LONG)
  }

  selfCheckSetting = () => {
    const { selfCheckWeeks, selfCheckWeeksOptions, selfCheckTime } = this.state

    return (
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>веднъж на </Text>
        <Picker
          itemStyle={styles.settingText}
          mode="dropdown"
          onValueChange={(itemValue, itemIndex) => {
            this.setState({selfCheckWeeks: selfCheckWeeksOptions[itemIndex]})
            this.reminderSetToast(selfCheckTime, itemValue)
            }}
          selectedValue={selfCheckWeeks}
          style={{ height: vu.vmax(5), width: vu.vmax(11)}}>
          {
            selfCheckWeeksOptions.map(entry => 
            <Picker.Item key={entry} label={entry} value={entry}/>)
          }
        </Picker>
        <Text style={styles.settingText}> седмици в </Text>
        <TouchableOpacity
            onPress={async () => {
            const res = await this.timePicker(selfCheckTime.getHours(), selfCheckTime.getMinutes())

            if (res) {
              const time = selfCheckTime
              time.setHours(res.hour)
              time.setMinutes(res.minute)
              this.setState({
                selfCheckTime: time
              })
              this.reminderSetToast(time, selfCheckWeeks)
            }
            }}
            style={styles.settingOptionTouchableOpacity}>
          <Text style={styles.settingOptionText}>
            {this.timeToString(selfCheckTime)}
          </Text>
          <Icon name="arrow-drop-down" style={{fontSize: vu.vmax(2.2)}} />
        </TouchableOpacity>
        <Text style={styles.settingText}> ч.</Text>
      </View>
    )
  }

  appointmentSetting = () => {
    const { appointmentTime } = this.state
    return (
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>на </Text>
        <TouchableOpacity
            onPress={async () => {
            const res = await this.datePicker(appointmentTime)

            if (res) {
              const time = appointmentTime
              time.setDate(res.day)
              time.setMonth(res.month)
              time.setFullYear(res.year)
              this.setState({
                appointmentTime: time
              })

              this.reminderSetToast(time)
            }
            }}
            style={styles.settingOptionTouchableOpacity}>
          <Text style={styles.settingOptionText}>
            {this.dateToString(appointmentTime)} 
          </Text>
          <Icon name="arrow-drop-down" style={{fontSize: vu.vmax(2.2)}} />
        </TouchableOpacity>
        <Text style={styles.settingText}> в </Text>
        <TouchableOpacity
            onPress={async () => {
            const res = await this.timePicker(appointmentTime.getHours(), appointmentTime.getMinutes())

            if (res) {
              const time = appointmentTime
              time.setHours(res.hour)
              time.setMinutes(res.minute)
              this.setState({
                appointmentTime: time
              })

              this.reminderSetToast(time)
            }
            }}
            style={styles.settingOptionTouchableOpacity}>
          <Text style={styles.settingOptionText}>
            {this.timeToString(appointmentTime)} 
          </Text>
          <Icon name="arrow-drop-down" style={{fontSize: vu.vmax(2.2)}} />
        </TouchableOpacity>
        <Text style={styles.settingText}> ч.</Text>
      </View>
    )
  }

  render() {
    const { selfCheckSwitch, appointmentSwitch } = this.state

    return (
      <View style={styles.mainContainer}>
        <View style={styles.reminderContainer}>
          <View style={styles.reminderHeaderContainer}>
            <Text style={styles.text}>Профилактика вкъщи</Text>
            <Switch 
              onValueChange={() => this.setState({ selfCheckSwitch: !selfCheckSwitch })}
              thumbColor="white"
              trackColor={{false: colors.gray, true: colors.pink}} 
              value={selfCheckSwitch} />
          </View>
          {
            selfCheckSwitch
              ? this.selfCheckSetting()
              : null
          }
        </View>
        <View style={styles.reminderContainer}>
          <View style={styles.reminderHeaderContainer}>
            <Text style={styles.text}>Консултация със специалист</Text>
            <Switch 
              onValueChange={() => this.setState({ appointmentSwitch: !appointmentSwitch })}
              thumbColor="white"
              trackColor={{false: colors.gray, true: colors.pink}}
              value={appointmentSwitch} />
          </View>
          {
            appointmentSwitch
              ? this.appointmentSetting()
              : null
          }
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    orientation: state.orientation
  }
}

export default connect(mapStateToProps)(Reminders)
