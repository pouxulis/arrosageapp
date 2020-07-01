import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'



class EspaceVert extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            espaces: [],
            isLoading: true
        }
    }

    componentDidMount() {
        fetch('http://192.168.1.15:3000/espace').then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    espaces: responseJson
                })
            })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayZones = (EspaceLibelle) => {
        this.props.navigation.navigate("Zones", { EspaceLibelle: EspaceLibelle })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.list}>
                    <FlatList
                        data={this.state.espaces}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.second_container} onPress={() => this._displayZones(item.libelle)}>
                                <View style={styles.first_row}>
                                    <Text style={{ flex: 1, marginLeft: 7, fontSize: 20, color: 'white' }}>{item.libelle}</Text>
                                </View>

                            </TouchableOpacity>
                        )}
                    />
                    {this._displayLoading()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    list: {
        flex: 1,
        marginTop: 5
    },
    titre: {
        fontSize: 25,
        marginLeft: 5,
        color: 'white',
    },
    second_container: {
        flex: 0,
        flexDirection: 'column',
        height: 50,
        backgroundColor: '#1e824c',
        marginBottom: 2,
        marginTop:8,
        borderWidth: 1,
        borderRadius: 4,
        marginLeft: 20,
        marginRight: 20,
        borderColor: 'green',
    },
    first_row: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 10
    },
    second_row: {
        flex: 4,
        backgroundColor: 'black',
        margin: 2,
        borderRadius: 4
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default EspaceVert