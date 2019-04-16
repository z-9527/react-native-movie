import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import theme from '../../../theme/defalut'
import NetError from '../../../components/NetError'
import HotList from './HotList'

const {height, width} = Dimensions.get('window')

class Movie extends React.Component {
    state = {
        selectKey: 0,
    }

    switchHot = (selectKey) => {
        this.setState({
            selectKey
        })
    }

    render () {
        const {selectKey} = this.state
        return (
            <NetError>
                <View style={styles.topBar}>
                    <View style={styles.cityBox}>
                        <Text style={{fontSize: 15, color: theme.baseFontColor}}>武汉 </Text>
                        <Text style={{fontFamily: 'iconfont', fontSize: 12, color: theme.baseFontColor}}>&#xe695;</Text>
                    </View>
                    <View style={styles.switchHot}>
                        <Text style={{...styles.hotItem, ...(selectKey === 0 ? styles.active : {})}}
                              onPress={() => this.switchHot(0)}>正在热映</Text>
                        <Text style={{...styles.hotItem, ...(selectKey === 1 ? styles.active : {})}}
                              onPress={() => this.switchHot(1)}>即将上映</Text>
                    </View>
                    <View>
                        <Text style={styles.searchIcon}>&#xe692;</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    {
                        selectKey === 0 ? <HotList/> : <View>
                        </View>
                    }
                </View>
            </NetError>
        )
    }
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: theme.borderBottomColor,
        // padding: '0 15',  //这么设置不行，为什么
        paddingLeft: theme.basePadding,
        paddingRight: theme.basePadding,
    },
    cityBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchHot: {
        flexDirection: 'row',
    },
    hotItem: {
        height: 50,
        lineHeight: 50,
        width: width * 0.21,
        fontSize: 15,
        color: theme.baseFontColor,
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,

    },
    active: {
        color: theme.theme,
        borderBottomWidth: 2,
        borderBottomColor: theme.theme
    },
    searchIcon: {
        fontFamily: 'iconfont',
        fontSize: 18,
        color: theme.theme,
    }
})

export default Movie