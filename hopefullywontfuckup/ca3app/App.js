import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Places from './screens/Places'
import PlacesDetail from './screens/PlacesDetail'

export default class App extends React.Component {
    render() {
        return <Navigator />;
    }
}

const Navigator = StackNavigator({
    Places: {
        screen: Places,
        navigationOptions: {
            headerTitle: 'Places',
        }
    },
    PlacesDetail: {
        screen: PlacesDetail,
        navigationOptions: {
            headerTitle: 'Places Detail',
        }
    },
})

