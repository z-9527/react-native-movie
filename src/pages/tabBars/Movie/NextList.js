import React from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { get } from '../../../utils/ajax'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import MovieItem from '../../../components/MovieItem'
import LoadMore from '../../../components/LoadMore'
import theme from '../../../theme/defalut'

const {height, width} = Dimensions.get('window')
const ITEM_HEIGHT = 85

class NextList extends React.Component {
    state = {
        mostExpectedList: [],    //最受期待的电影列表
        expectedListHasMove: true,    //最受期待电影是否还有
        comingList: [],      //将要上映的电影列表
        movieIds: [],         //分页需要
        loadingMore: false,      //加载loading
        completed: false //数据是否加载完

    }

    componentDidUpdate (prevProps) {
        if (this.props.city.id !== prevProps.city.id) {
            this.getMostExpectedList()
            this.getComingList()
        }
    }

    getMostExpectedList = async () => {
        if (!this.state.expectedListHasMove) {
            return
        }
        const mostExpectedList = this.state.mostExpectedList
        const res = await get('https://m.maoyan.com/ajax/mostExpected', {
            ci: this.props.city.id || 57,
            limit: 10,
            offset: mostExpectedList.length,
            token: ''
        })
        this.setState({
            mostExpectedList: mostExpectedList.concat(res.coming || []),
            expectedListHasMove: res.paging && res.paging.hasMore
        })
    }
    _renderExpectedItem = ({item}) => {
        let img = item.img
        img = img.replace('http', 'https')
        img = img.replace('w.h', '170.230')
        return <TouchableOpacity style={styles.expectedItem} activeOpacity={0.8}
                                 onPress={() => this.props.navigation.navigate('Test')}>
            <View><Image source={{uri: img}} style={styles.poster}/></View>
            <View>
                <Text numberOfLines={1} style={styles.expectedName}>{item.nm}</Text>
                <Text numberOfLines={1} style={styles.expectedText}>{item.wish}人想看</Text>
                <Text numberOfLines={1} style={styles.expectedText}>{item.comingTitle.split(' ')[0]}</Text>
            </View>
        </TouchableOpacity>
    }

    _renderHeader = () => {
        return (
            <View style={styles.mostExpectedListBox}>
                <Text style={styles.title}>近期最受期待</Text>
                <FlatList
                    style={styles.mostExpectedList}
                    horizontal={true}
                    getItemLayout={(data, index) => ( {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index} )}
                    data={this.state.mostExpectedList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={this._renderExpectedItem}
                    onEndReached={this.getMostExpectedList}
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
    }
    getComingList = async () => {
        const res = await get('https://m.maoyan.com/ajax/comingList', {
            ci: this.props.city.id || 57,
            limit: 10,
            token: ''
        })
        this.setState({
            comingList: res.coming || [],
            movieIds: res.movieIds || []
        })
    }
    loadMoreComingList = async () => {
        const {completed, loadingMore, movieIds, comingList} = this.state
        if (loadingMore || completed) {
            //如果数据正在加载或数据加载完成就return
            return
        }
        this.setState({
            loadingMore: true
        })
        //构建查询参数
        const ids = movieIds.slice(comingList.length, comingList.length + 10).join(',')
        const res = await get(`https://m.maoyan.com/ajax/moreComingList`, {
            ci: this.props.city.id || 57,
            token: '',
            limit: 10,
            movieIds: ids
        })
        const list = comingList.concat(res.coming || [])
        this.setState({
            loadingMore: false,
            comingList: list,
            completed: list.length >= movieIds.length
        })
    }
    _renderItem = ({item, index}) => {
        const {comingList} = this.state
        return (
            <View>
                {
                    (index === 0 || comingList[index - 1].comingTitle !== comingList[index].comingTitle) ? <View>
                        <Text style={styles.title}>{item.comingTitle}</Text>
                        <MovieItem movie={item}/>
                    </View> : <View><MovieItem movie={item}/></View>
                }
            </View>
        )
    }

    render () {
        const {comingList, loadingMore, completed} = this.state
        //这里可以用SectionList，但是处理数据的相较于直接使用FlatList更复杂
        return (
            <FlatList
                data={comingList}
                keyExtractor={item => `${item.id}`}
                ListHeaderComponent={this._renderHeader}
                renderItem={this._renderItem}
                onEndReached={this.loadMoreComingList}
                onEndReachedThreshold={0.1}
                ListFooterComponent={<LoadMore loadingMore={loadingMore} completed={completed}/>}
                getItemLayout={(data, index) => ( {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index} )}
            />
        )
    }
}

const styles = StyleSheet.create({
    mostExpectedListBox: {
        paddingBottom: 30,
        borderBottomWidth: 10,
        borderBottomColor: theme.fillColor
    },
    title: {
        marginRight: 15,
        marginLeft: 15,
        marginTop: 12,
        marginBottom: 12,
        color: '#333',
        fontSize: 14
    },
    mostExpectedList: {
        width: width - 30,
        marginRight: 15,
        marginLeft: 15,
    },
    expectedItem: {
        width: 85,
        marginRight: 10
    },
    poster: {
        width: 85,
        height: 115
    },
    expectedName: {
        marginTop: 6,
        marginBottom: 3,
        color: '#666'
    },
    expectedText: {
        color: '#999',
        fontSize: 12
    }

})

export default connect((state) => {
    return {city: state.city}
})(withNavigation(NextList))