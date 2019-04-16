import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { get } from '../../../utils/ajax'
import MovieItem from '../../../components/MovieItem'

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
        console.log(ids,444)
        const res = await get(`https://m.maoyan.com/ajax/moreComingList?movieIds=${ids}`)
        console.log(666,res)
        this.setState({
            loadingMore: false,
        })
    }

    render () {
        const {movieList, refreshing} = this.state
        return (
            <View style={{flex: 1}} onResponderMove={(e) => console.log(123, e)}>
                <FlatList
                    onRefresh={this.getMovieList}
                    refreshing={refreshing}
                    data={movieList}
                    onEndReached={this.loadMoreList}
                    onEndReachedThreshold={0.1}
                    getItemLayout={(data, index) => ( {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index} )}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({item}) => <MovieItem movie={item}/>}
                />
            </View>
        )
    }
}

export default HotList