import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'


class Zones extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            zones: [],
            isLoading: true
        }
    }

    componentDidMount() {
        fetch('http://192.168.1.15:3000/zone').then((response) => response.json())
            .then((responseJson) => {
                fetch('http://192.168.1.15:3000/espace').then((response) => response.json())
            .then((responseJson2) => {
                responseJson.forEach((obj) => {
                    responseJson2.forEach((obj2) => {
                    
                        if (obj.espace_vert_id == obj2.id) {
                            obj.espace_vert=obj2.libelle
                        }
                    })
                })
                const zonesEspaces = [];
                responseJson.forEach((obj) => {
                    if (obj.espace_vert == this.props.navigation.state.params.EspaceLibelle) {
                        zonesEspaces.push(obj);
                    }
                })
                this.setState({
                    isLoading: false,
                    zones: zonesEspaces
                })

            })
    })
}

    _displayInfoZone(idZone){
        this.props.navigation.navigate("InfoZone",{idZone:idZone})
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

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.list}>
                    <FlatList
                        data={this.state.zones}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.second_container} onPress={() => this._displayInfoZone(item.id)}>
                                <View style={styles.first_row}>
                                    <Text style={{ flex: 1, marginLeft: 7, fontSize: 20, color: 'white' }}>{item.libelle}</Text>
                                    <View style={styles.zonephoto}>

                                    </View>
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
        height: 200,
        backgroundColor: '#1e824c',
        marginTop:10,
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 4,
        marginLeft: 25,
        marginRight: 25,
        borderColor: 'green',
    },
    first_row: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 10
    },
    zonephoto: {
        flex: 4,
        backgroundColor: 'white',
        margin: 2,
        borderRadius: 4
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Zones