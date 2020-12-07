import {Dimensions} from 'react-native'
const window = Dimensions.get('window')

export function vw(percentage) {
    return Math.round(percentage * window.width / 100)
}

export function vh(percentage) {
    return Math.round(percentage * window.height / 100)
}

export function vmax(percentage) {
    return Math.round(percentage * Math.max(window.height, window.width) / 100)
}

export function vmin(percentage) {
    return Math.round(percentage * Math.min(window.height, window.width) / 100)
}