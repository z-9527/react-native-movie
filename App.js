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
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import appStore from './src/store/reducers'
import { Provider } from 'react-redux'
import { initCity } from './src/store/actions'

const store = createStore(appStore, applyMiddleware(thunkMiddleware))

store.dispatch(initCity())    //初始化用户位置城市

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;   //让谷歌浏览器可以查看网络请求,但是浏览器又会有跨域的问题

class App extends Component {
    render () {
        return (
            <View style={{flex: 1}}>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </View>
        )
    }
}

export default App
