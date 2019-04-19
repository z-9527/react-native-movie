import React from 'react'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import theme from '../../theme/defalut'

class LoadMore extends React.Component {

    static propTypes = {
        completed: PropTypes.bool,
        loadingMore: PropTypes.bool
    }
    static defaultProps = {
        completed: false,
        loadingMore: false
    }

    render () {
        const {completed, loadingMore} = this.props
        return (
            <View style={styles.loadingMoreBox}>
                {
                    completed ? <Text style={styles.loadText}>数据加载完毕</Text> : ( loadingMore &&
                        <View style={{flexDirection: 'row'}}>
                            <ActivityIndicator size={'small'} color={theme.baseFontColor}/><Text
                            style={styles.loadText}> 正在加载...</Text>
                        </View> )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingMoreBox: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadText: {
        color: theme.baseFontColor,
        fontSize: theme.baseFontSize
    }
})

export default LoadMore