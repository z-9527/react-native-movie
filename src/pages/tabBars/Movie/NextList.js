import React from 'react'
import {
    View,
    Text,
    SectionList,
    FlatList,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import { get } from '../../../utils/ajax'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import MovieItem from '../../../components/MovieItem'
import LoadMore from '../../../components/LoadMore'
import theme from '../../../theme/defalut'

const {height, width} = Dimensions.get('window')

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
    getComingList = async () => {
        const res = await get('https://m.maoyan.com/ajax/comingList', {
            ci: this.props.city.id || 57,
            limit: 10,
            token: ''
        })
        this.setState({
            comingList: this._handleComingList([], res.coming || []),
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
        const list = this._handleComingList(comingList, res.coming || [])
        console.log(123, list)
        this.setState({
            loadingMore: false,
            comingList: list,
            completed: list.length >= movieIds.length
        })
    }
    _handleComingList = (arr1, arr2) => {
        let list = arr1.slice()
        for (let item of arr2) {
            const index = list.findIndex(a => a.comingTitle === item.comingTitle)
            if (index === -1) {
                list.push({
                    comingTitle: item.comingTitle,
                    data: [item]
                })
            } else {
                list[index].data.push(item)
            }
        }
        return list
    }

    render () {
        const {mostExpectedList, comingList, loadingMore, completed} = this.state
        const ITEM_HEIGHT = 85
        return (
            <ScrollView style={{flex: 1}}>
                <View style={styles.mostExpectedListBox}>
                    <Text style={styles.title}>近期最受期待</Text>
                    <FlatList
                        style={styles.mostExpectedList}
                        horizontal={true}
                        getItemLayout={(data, index) => ( {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index} )}
                        data={mostExpectedList}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={this._renderExpectedItem}
                        onEndReached={this.getMostExpectedList}
                        onEndReachedThreshold={0.1}
                    />
                </View>
                <View style={{flex: 1}}>
                    <SectionList
                        sections={comingList}
                        renderSectionHeader={({section}) => <Text style={styles.title}>{section.comingTitle}</Text>}
                        renderItem={({item}) => <MovieItem movie={item}
                                                           onPressHandle={() => this.props.navigation.navigate('Test')}/>}
                        onEndReached={this.loadMoreComingList}
                        onEndReachedThreshold={1}
                        ListFooterComponent={<LoadMore loadingMore={loadingMore} completed={completed}/>}
                    />
                </View>
            </ScrollView>
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