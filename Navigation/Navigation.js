import { createStackNavigator, HeaderTitle } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import EspaceVert from '../Components/EspaceVert'
import Zones from '../Components/Zones'
import Login from '../Components/Login'
import InfoZone from '../Components/InfoZone'


const EspaceStackNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        }
    },
    InfoZone: {
        screen: InfoZone,
        navigationOptions: {
            title: 'Infos de zone',
            headerTintColor: '#1e824c',
            headerStyle: {
                backgroundColor: 'white',
            }
        }
    },
    EspaceVert: {
        screen: EspaceVert,
        navigationOptions: {
            title: 'Mes espaces verts',
            headerTintColor: '#1e824c',
            headerStyle: {
                backgroundColor: 'white',
            }
        }
    },
    Zones: {
        screen: Zones,
        navigationOptions: {
            title: "Les zones d'espace",
            headerTintColor: '#1e824c',
            headerStyle: {
                backgroundColor: 'white',
            }
        }
    }
})

export default createAppContainer(EspaceStackNavigator)