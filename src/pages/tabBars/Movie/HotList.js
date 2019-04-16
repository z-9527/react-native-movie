import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { get } from '../../../utils/ajax'
import MovieItem from '../../../components/MovieItem'
import {handleImglist} from '../../../utils/util'

class HotList extends React.Component {
    state = {
        movieList: [],
        movieIds: [], //正在热映电影列表id（分页需要）
    }

    componentDidMount () {
        this.getMovieList()
    }

    getMovieList = async () => {
        const res = await get('https://m.maoyan.com/ajax/movieOnInfoList?token=')
        this.setState({
            movieList: res.movieList || [],
            movieIds: res.movieIds || []
        })
    }

    render () {
        const {movieList} = this.state
        return (
            <View style={{flex: 1}} onResponderMove={(e)=>console.log(123,e)}>
                <FlatList
                    data={movieList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({item}) => <MovieItem movie={item}/>}
                />
            </View>
        )
    }
}

export default HotList