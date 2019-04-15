import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import style from '../../theme/defalut'
import Movie from './Movie'
import Cinema from './Cinema'
import User from './User'

const RouteConfigs = {
    Movie: {
        screen: Movie,
        navigationOptions: {
            tabBarLabel: '电影',
            tabBarIcon: ({focused}) => {
                const icon = focused ? require('../../assets/images/movieSelect.png') : require('../../assets/images/movie.png')
                return <Image source={icon} style={{width: 25, height: 25}}/>
            }
        }
    },
    Cinema: {
        screen: Cinema,
        navigationOptions: {
            tabBarLabel: '影院',
            tabBarIcon: ({focused}) => {
                const icon = focused ? require('../../assets/images/cinemaSelect.png') : require('../../assets/images/cinema.png')
                return <Image source={icon} style={{width: 25, height: 25}}/>
            }
        }
    },
    User: {
        screen: User,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({focused}) => {
                const icon = focused ? require('../../assets/images/userSelect.png') : require('../../assets/images/user.png')
                return <Image source={icon} style={{width: 25, height: 25}}/>
            }
        }
    },
}

const StackNavigatorConfig = {
    tabBarOptions: {
        activeTintColor: style.theme,
        labelStyle: {
            fontSize: 12
        }
    }
}

export default createBottomTabNavigator(RouteConfigs, StackNavigatorConfig)