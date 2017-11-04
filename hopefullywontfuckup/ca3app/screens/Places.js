import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import placeFacade from '../facades/placeFacade'
import { StackNavigator } from 'react-navigation'
import PlacesDetail from './PlacesDetail'

export default class Places extends Component {
    constructor(props) {
        super()
        this.state = {
            places: []
        }
    }

    componentDidMount() {
        placeFacade.setPlaceObserver(this.placesUpdater)
        placeFacade.fetchPlaces()
    }

    placesUpdater = (places) => {
        this.setState({
            places
        })
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        )
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                <FlatList
                    data={this.state.places}
                    renderItem={({ item }) => {
                        console.log("state places", this.state.places)
                        return (
                            <TouchableOpacity onPress={() => navigate('PlacesDetail', {id: item.id})}>
                                <ListItem
                                    title={`${item.description}`}
                                    subtitle={`${item.address.city} - ${item.address.street}`}
                                    avatar={{ uri: "https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/20294416_1695690513792031_5913082279411205996_n.jpg?oh=1fb3d32cade5e09fd246d395b402b0d2&oe=5A67376A" }}
                                    containerStyle={{ borderBottomWidth: 0 }}
                                />
                            </TouchableOpacity>
                        )
                    }}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={item => item.id}                    
                />
            </List>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    touchableContainer: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    text: {
        color: '#000000'
    }
})