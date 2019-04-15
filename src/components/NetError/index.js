import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import NetInfo from '@react-native-community/netinfo'

class NetError extends React.Component {
    state = {
        isConnected: true
    }

    componentDidMount () {
        this.setConnected()
        NetInfo.addEventListener('connectionChange', this.onConnectionChange)
    }

    componentWillUnmount () {
        NetInfo.removeEventListener('connectionChange', this.onConnectionChange)

    }

    onConnectionChange = () => {
        this.setConnected()
    }
    setConnected = () => {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({
                isConnected
            })
        })
    }

    render () {
        const {isConnected} = this.state
        return (
            <View style={{flex: 1}}>
                {
                    isConnected ? this.props.children : <View style={styles.container}>
                        <Text>请检查网络连接</Text>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default NetError