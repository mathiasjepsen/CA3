import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { List, ListItem, Avatar, Rating } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'


export default class PlacesDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: props.navigation.state.params.place
        }
    }

    render() {
        let place = this.state.place
        let rating = this.state.place.rating;
        return (
            <View style={styles.container}>
                <Avatar
                    xlarge
                    source={{ uri: `${place.image}` }}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                />
                <Text>{`City: ${place.address.city}`}</Text>
                <Text>{`Street: ${place.address.street}`}</Text>
                <Text>{`Zip Code: ${place.address.zip}`}</Text>
                <Text>{`GPS Location: ${place.address.location}`}</Text>

                <Rating
                    imageSize={40}
                    readonly
                    startingValue={rating}
                    style={{ paddingVertical: 10 }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 22
    },
    text: {
        
    }
})