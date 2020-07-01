import React from 'react';
import { StyleSheet, View, FlatList, Text, SafeAreaView } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';

class InfoZone extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            typeNombre: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        let plante = [];
        fetch('http://192.168.1.15:3000/plante').then((response) => response.json())
            .then((plante) => {

                fetch('http://192.168.1.15:3000/plantage').then((response) => response.json())
                    .then((responseJson) => {
                        fetch('http://192.168.1.15:3000/typeplante').then((response) => response.json())
                    .then((typeplante) => {

                        const tynum = [];
                        const plantage = [];
                        responseJson.forEach((obj) => {
                            if (obj.id_zone == this.props.navigation.state.params.idZone) {
                                plantage.push(obj);
                            }
                        })
                        let id = 0;
                        plantage.forEach((obj) => {
                            plante.forEach((obje) => {
                                if (obj.id_plante === obje.id) {
                                    id += 1;
                                    tynum.push({
                                        "id": id,
                                        "typeplante_id": obje.typeplante_id,
                                        "nombre": obj.nombre
                                    })
                                }
                            })
                        })

                        tynum.forEach((obj)=>{
                            typeplante.forEach((obje)=>{
                                if(obj.typeplante_id==obje.id){
                                        obj.typeplante=obje.libelle
                                }
                            })
                        })
                        const tynumfinale = [];
                        let duplicateObj = [];
                        let summ;
                        tynum.forEach((obj) => {
                            let sum = obj["nombre"];
                            if (!duplicateObj.includes(obj.typeplante)) { //verifier si le typeplante existe deja dans le tableau tynumfinale
                                tynum.forEach((obje) => {
                                    if (obj.id != obje.id) { // verifier si l'objet est le meme
                                        if (obj.typeplante == obje.typeplante) {
                                            sum += obje["nombre"];
                                        }
                                    }
                                })
                                summ = sum;
                                tynumfinale.push({
                                    "id": obj.id,
                                    "typeplante": obj.typeplante,
                                    "nombre": summ
                                })
                                duplicateObj.push(obj.typeplante);
                            }
                        })
                        this.setState({
                            typeNombre: tynumfinale
                        })
                    })
                })
            })

    }


    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.list}>
                    <FlatList
                        data={this.state.typeNombre}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.second_container}>
                                <View style={styles.zonephoto}>

                                </View>
                                <View style={styles.typeplante}>
                                    <Text style={styles.text}>{item.typeplante}</Text>
                                </View>
                                <View style={styles.nombre}>
                                    <Text style={styles.text}>{item.nombre}</Text>
                                </View>
                            </View>
                        )}
                        ListFooterComponent={
                            <View style={{ flex: 1 }}>
                                <Text style={{ marginTop: 30, marginLeft: 25, fontSize: 18 }}>Evolution de température</Text>
                                <LineChart
                                    data={{
                                        labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
                                        datasets: [
                                            {
                                                data: [
                                                    Math.floor(Math.random() * (30 - 20 + 1) + 20),
                                                    Math.floor(Math.random() * (30 - 20 + 1) + 20),
                                                    Math.floor(Math.random() * (30 - 20 + 1) + 20),
                                                    Math.floor(Math.random() * (30 - 20 + 1) + 20),
                                                    Math.floor(Math.random() * (30 - 20 + 1) + 20),
                                                    Math.floor(Math.random() * (30 - 20 + 1) + 20),
                                                    Math.floor(Math.random() * (30 - 20 + 1) + 20), Math.floor(Math.random() * (30 - 20 + 1) + 20), Math.floor(Math.random() * (30 - 20 + 1) + 20), Math.floor(Math.random() * (30 - 20 + 1) + 20), Math.floor(Math.random() * (30 - 20 + 1) + 20), Math.floor(Math.random() * (30 - 20 + 1) + 20)
                                                ]
                                            }
                                        ]
                                    }}
                                    width={330} // from react-native
                                    height={220}
                                    yAxisLabel=""
                                    yAxisSuffix="°C"
                                    yAxisInterval={1} // optional, defaults to 1
                                    chartConfig={{
                                        backgroundColor: 'white',
                                        backgroundGradientFrom: "#1e824c",
                                        backgroundGradientTo: "#ffa726",
                                        decimalPlaces: 2, // optional, defaults to 2dp
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "6",
                                            strokeWidth: "2",
                                            stroke: "#1e824c"
                                        }
                                    }}
                                    bezier
                                    style={{
                                        marginVertical: 8,
                                        marginTop: 10,
                                        marginLeft: 15,
                                        marginBottom: 25,
                                        borderRadius: 16
                                    }}
                                />
                                <Text style={{ marginTop: 5, marginLeft: 25, fontSize: 18 }}>Evolution de l'humidité</Text>
                                <LineChart
                                    data={{
                                        labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
                                        datasets: [
                                            {
                                                data: [
                                                    Math.floor(Math.random() * (75 - 50 + 1) + 50),
                                                    Math.floor(Math.random() * (75 - 50 + 1) + 50),
                                                    Math.floor(Math.random() * (75 - 50 + 1) + 50),
                                                    Math.floor(Math.random() * (75 - 50 + 1) + 50),
                                                    Math.floor(Math.random() * (75 - 50 + 1) + 50),
                                                    Math.floor(Math.random() * (75 - 50 + 1) + 50),
                                                    Math.floor(Math.random() * (75 - 50 + 1) + 50), Math.floor(Math.random() * (75 - 50 + 1) + 50), Math.floor(Math.random() * (75 - 50 + 1) + 50), Math.floor(Math.random() * (75 - 50 + 1) + 50), Math.floor(Math.random() * (75 - 50 + 1) + 50), Math.floor(Math.random() * (75 - 50 + 1) + 50)
                                                ]
                                            }
                                        ]
                                    }}
                                    width={330} // from react-native
                                    height={220}
                                    yAxisLabel=""
                                    yAxisSuffix="%"
                                    yAxisInterval={1} // optional, defaults to 1
                                    chartConfig={{
                                        backgroundColor: 'white',
                                        backgroundGradientFrom: "#1e824c",
                                        backgroundGradientTo: "#ffa726",
                                        decimalPlaces: 2, // optional, defaults to 2dp
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                        style: {
                                            borderRadius: 16
                                        },
                                        propsForDots: {
                                            r: "6",
                                            strokeWidth: "2",
                                            stroke: "#1e824c"
                                        }
                                    }}
                                    bezier
                                    style={{
                                        marginVertical: 8,
                                        marginTop: 10,
                                        marginLeft: 15,
                                        marginBottom: 1,
                                        borderRadius: 16
                                    }}
                                />
                                <AwesomeAlert
          show={true}
          showProgress={false}
          title="Attention !"
          message="l'humidité est au dessous de 60%"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="D'accord"
          confirmButtonColor="#1e824c"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
                            </View>
                        }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white',
    },
    list: {
        flex: 1,
        marginTop: 15
    },
    second_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 66,
        marginLeft: 20,
        marginRight: 20
    },
    zonephoto: {
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: '#1e824c'
    },
    typeplante: {
        flex: 5,
        justifyContent: 'center',
        height: 63,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    nombre: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 63,
        marginRight: 10
    },
    text: {
        fontSize: 17,
        marginLeft: 25
    }
})

export default InfoZone