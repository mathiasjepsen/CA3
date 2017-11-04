import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

export default class PlacesDetail extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.navigation.state.params.id}</Text>
            </View>
        )
    }
}