import React from 'react'
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native'
import theme from '../../../theme/defalut'
import NetError from '../../../components/NetError'
import HotList from './HotList'
import { throttle } from '../../../utils/util'

const {height, width} = Dimensions.get('window')


class Movie extends React.Component {
    state = {
        selectKey: 0,
        translateX: new Animated.Value(0),   //动画初始值一定是要Animated.Value
    }

    switchHot = (selectKey) => {
        this.setState({
            selectKey,
            translateX: selectKey === 0 ? 0 : -width
        })
    }
    onTouchStart = (e) => {
        const nativeEvent = e.nativeEvent
        this.touch = {
            startX: nativeEvent.pageX,
            startY: nativeEvent.pageY,
        }
    }
    onTouchMove = throttle((e) => {
        if (!this.touch) {
            return
        }
        const nativeEvent = e.nativeEvent

        const moveX = nativeEvent.pageX - this.touch.startX     //计算手指横向移动距离
        const moveY = nativeEvent.pageY - this.touch.startY     //计算手指纵向移动距离\
        //当纵向移动距离大于横向移动距离就认为用户是在滚动列表
        if (Math.abs(moveY) - Math.abs(moveX) > 0) {
            return
        }
        const left = this.state.selectKey === 0 ? 0 : -width
        const translateX = Math.min(0, Math.max(-width, left + moveX))
        this.touch.percent = Math.abs(translateX / width)
        this.setState({
            translateX
        })

    }, 100)
    onTouchEnd = () => {
        const percent = this.touch.percent
        let selectKey = this.state.selectKey

        //当移动距离大于20%的时候就自动切换，否则还原回去
        if (this.state.selectKey === 0) {
            if (percent > 0.2) {
                selectKey = 1
            }
        } else {
            if (percent < 0.8) {
                selectKey = 0
            }
        }
        this.switchHot(selectKey)
        this.touch = null
    }

    render () {
        const {selectKey, translateX} = this.state
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
                <Animated.View style={{...styles.mainContent, transform: [{translateX}]}}
                               onStartShouldSetResponder={() => true}
                               onMoveShouldSetResponder={() => true}
                               onResponderGrant={this.onTouchStart}
                               onResponderMove={this.onTouchMove}
                               onResponderRelease={this.onTouchEnd}
                >
                    <View style={styles.tab}>
                        <HotList/>
                    </View>
                    <View style={styles.tab}>
                        <Text>fdasfa</Text>
                    </View>
                </Animated.View>
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
    },
    mainContent: {
        flex: 1,
        flexDirection: 'row',
        width: 2 * width,
    },
    tab: {
        flex: 1,
        width: width,
    }
})

export default Movie