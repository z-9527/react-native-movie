import { createAppContainer, createStackNavigator } from 'react-navigation'
import style from '../theme/defalut'
import Home from '../pages/tabBars'
import Test from '../pages/subPages/Test'
import CitySelect from '../pages/subPages/CitySelect'

const RouteConfigs = {
    Home: {screen: Home,navigationOptions:({navigation})=>{
        //createBottomTabNavigator不能设置title，所以只能用这种方法设置了
        const titles = ['电影','影院','我的']
        return {
            title:titles[navigation.state.index]
        }
    }},
    Test: {screen: Test},
    CitySelect: {screen: CitySelect},
}

const StackNavigatorConfig = {
    initialRouteName: 'Home',
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: style.theme,
            height:55
        },
        headerTintColor: '#fff',
    }
}

const AppNavigator = createStackNavigator(RouteConfigs, StackNavigatorConfig)

export default createAppContainer(AppNavigator)