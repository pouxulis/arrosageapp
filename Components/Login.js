import React from 'react'
import { Image,StatusBar, View, Text,TextInput, StyleSheet, Button, ActivityIndicator, TouchableOpacity } from 'react-native'
import bcrypt from "react-native-bcrypt"


class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username:"",
            password:"",
            doesMatch: false
        }
    }


_toEspace(){
    fetch('http://192.168.1.15:3000/users').then((response) => response.json())
            .then((responseJson) => {
                responseJson.forEach((obj)=>{
                    if(obj.username==this.state.username){
                        if(bcrypt.compareSync(this.state.password, obj.password)){
                            this.props.navigation.navigate("EspaceVert")
                        }
                    }
                })
            })

}

_onChangeUser(text){
    this.setState({
        username:text
    })
}

_onChangePassword(text){
    this.setState({
        password:text
    })
}


    render() {
        return (
            <View style={styles.main_container}>
                <StatusBar   
     backgroundColor = "#1e824c"  
     barStyle = "light-content"   
  />  
                <View style={styles.list}>
                    <View style={styles.name}>
                        <Image
                            style={styles.image}
                            source={require('../Images/arrosage.png')}
                        />
                    </View>
                    <View style={styles.login}>
                        <TextInput
                            style={styles.textinput}
                            onChangeText={(text) => this._onChangeUser(text)}
                            placeholder='Login'
                        />
                    </View>
                    <View style={styles.login}>
                    <TextInput
                    secureTextEntry
                            style={styles.textinput}
                            onChangeText={text => this._onChangePassword(text)}
                            placeholder='Password'
                        />
                    </View>
                    <View style={styles.button}>
                    <TouchableOpacity style={{flex:0.15,justifyContent:'center',width:'50%',backgroundColor:'white',borderRadius:40}} title='Login' onPress={() => this._toEspace()}>
                    <Text style={{ textAlign: 'center', color: '#1e824c', fontSize: 18, }}>Login</Text>
                    </TouchableOpacity>
                    </View>
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
        flexDirection: 'column',
        backgroundColor: '#1e824c'
    },
    name: {
        flex: 4,
        marginTop: 1,
        backgroundColor: '#1e824c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    login: {
        flex: 1,
        marginTop: 1,
        backgroundColor: '#1e824c',
        justifyContent:'center',
    
    },
    password: {
        flex: 1,
        marginTop: 1,
        backgroundColor: 'red'
    },
    button: {
        flex: 4,
        backgroundColor: '#1e824c',
        justifyContent: 'center',
        alignItems:'center'
    },
    image: {
        height: 140,
        width: 140,
    },
    textinput:{
        marginLeft: 5,
    marginRight: 5,
    height: 50,
    backgroundColor:'white',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius:10,
    paddingLeft: 5
    }
})

export default Login