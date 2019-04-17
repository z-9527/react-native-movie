/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View } from 'react-native'
import AppContainer from './src/navgation/index'

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;   //让谷歌浏览器可以查看网络请求,但是浏览器又会有跨域的问题

class App extends Component {
    render () {
        return (
            <View style={{flex: 1}}>
                <AppContainer/>
            </View>
        )
    }
}

export default App
