import React from 'react'
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { get } from '../../../utils/ajax'
import MovieItem from '../../../components/MovieItem'
import theme from '../../../theme/defalut'
import { withNavigation } from 'react-navigation'

const ITEM_HEIGHT = 115

class HotList extends React.Component {
    state = {
        movieList: [],
        movieIds: [], //正在热映电影列表id（分页需要）
        refreshing: false,  //下拉刷新loading
        loadingMore: false,  //加载更多的loading
        completed: false //数据是否加载完
    }

    componentDidMount () {
        this.getMovieList()
    }

    getMovieList = async () => {
        this.setState({
            refreshing: true
        })
        const res = await get('https://m.maoyan.com/ajax/movieOnInfoList?token=')
        this.setState({
            movieList: res.movieList || [],
            movieIds: res.movieIds || []
        })
        this.setState({
            refreshing: false
        })
    }
    loadMoreList = async () => {
        const {completed, loadingMore, movieIds, movieList} = this.state
        if (loadingMore || completed) {
            //如果数据正在加载或数据加载完成就return
            return
        }
        this.setState({
            loadingMore: true
        })
        //构建查询参数
        const ids = movieIds.slice(movieList.length, movieList.length + 10).join(',')
        const res = await get(`https://m.maoyan.com/ajax/moreComingList?token=&movieIds=${ids}`)
        const list = movieList.concat(res.coming || 0)
        this.setState({
            loadingMore: false,
            movieList: list,
            completed: list.length >= movieIds.length
        })
    }
    _renderFooter = () => {
        return (
            <View style={styles.loadingMoreBox}>
                {
                    this.state.completed ? <Text style={styles.loadText}>数据加载完毕</Text> : ( this.state.loadingMore &&
                        <View style={{flexDirection: 'row'}}>
                            <ActivityIndicator size={'small'} color={theme.baseFontColor}/><Text
                            style={styles.loadText}> 正在加载...</Text>
                        </View> )
                }
            </View>
        )
    }

    render () {
        const {movieList, refreshing} = this.state
        return (
            <View style={{flex: 1}}>
                <FlatList
                    onRefresh={this.getMovieList}
                    refreshing={refreshing}
                    data={movieList}
                    onEndReached={this.loadMoreList}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this._renderFooter}
                    getItemLayout={(data, index) => ( {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index} )}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({item}) => <MovieItem movie={item}
                                                       onPressHandle={() => this.props.navigation.navigate('Test')}/>}
                />
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

export default withNavigation(HotList)