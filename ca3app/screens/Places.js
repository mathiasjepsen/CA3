import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { List, ListItem, ButtonGroup } from 'react-native-elements'
import placeFacade from '../facades/placeFacade'
import { StackNavigator } from 'react-navigation'
import PlacesDetail from './PlacesDetail'

export default class Places extends Component {
    constructor(props) {
        super()
        this.state = {
            places: [],
            selectedIndex: 2
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

    updateIndex = (selectedIndex) => {
        this.setState({
            selectedIndex
        })
        switch (selectedIndex) {
            case 0:
                this.placesUpdater(placeFacade.sortByRating(this.state.places))
                break
            case 1:
                this.placesUpdater(placeFacade.sortByCity(this.state.places))
                break
            case 2:
                this.placesUpdater(placeFacade.sortByZip(this.state.places))
                break
        }  
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
        const buttons = ['Rating', 'City', 'Zip']
        const { selectedIndex } = this.state
        return (
            <View>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{ height: 30 }}
                />
                <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
                    <FlatList
                        data={this.state.places}
                        extraData={this.state}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => navigate('PlacesDetail', { place: item })}>
                                    <ListItem
                                        title={`${item.description}`}
                                        subtitle={`${item.address.city} - ${item.address.street}`}
                                        avatar={{ uri: `https://mathiasjepsen.dk/backend/ca3/images/${item.image}` }}
                                        containerStyle={{ borderBottomWidth: 0 }}
                                    />
                                </TouchableOpacity>
                            )
                        }}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={item => item.id}
                    />
                </List>
            </View>
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