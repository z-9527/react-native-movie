import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import theme from '../../theme/defalut'

class MovieItem extends React.Component {

    renderBtn = (type) => {
        switch (type) {
            case 1 :
                return <Text style={{...styles.btn,backgroundColor:'#faaf00'}}>想看</Text>
            case 3 :
                return <Text style={styles.btn}>购票</Text>
            case 4 :
                return <Text style={{...styles.btn,backgroundColor:'#3c9fe6'}}>预售</Text>
            default :
                return <Text style={styles.btn}>购票</Text>
        }
    }

    render () {
        const {movie} = this.props
        let img = movie.img
        img = img.replace('http', 'https')
        img = img.replace('w.h', '128.180')
        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.poster} source={{uri: img}}/>
                </View>
                <View style={styles.right}>
                    <View style={styles.info}>
                        <View>
                            <Text style={{fontSize: 16, color: '#333'}} numberOfLines={1}>{movie.nm}  </Text>
                        </View>
                        <View>
                            {movie.globalReleased ? ( movie.sc ? <Text style={styles.text}>观众评 <Text
                                    style={styles.golden}>{movie.sc}</Text></Text> : <Text>暂无评分</Text> ) :
                                <Text style={styles.text}><Text
                                    style={styles.golden}>{movie.wish}</Text> 想看</Text>}
                        </View>
                        <View>
                            <Text style={styles.text} numberOfLines={1}>主演：{movie.star}</Text>
                        </View>
                        <View>
                            {movie.globalReleased ?
                                <Text style={styles.text} numberOfLines={1}>{movie.showInfo}</Text> :
                                <Text style={styles.text}>{movie.rt}上映</Text>}
                        </View>
                    </View>
                    <View>
                        {this.renderBtn(movie.showst)}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 115,
        paddingLeft: theme.basePadding
    },
    poster: {
        width: 64,
        height: 90
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 115,
        marginLeft: 15,
        paddingRight: theme.basePadding,
        borderBottomWidth: 1,
        borderBottomColor: theme.borderBottomColor
    },
    info: {
        flex: 1,
        marginRight: 5
    },
    text: {
        fontSize: 13,
        color: '#666'
    },
    golden: {
        color: theme.golden,
        fontWeight: 'bold',
        fontSize: 14
    },
    btn: {
        alignItems: 'center',
        width: 47,
        height: 27,
        // lineHeight:27,
        textAlignVertical: 'center',
        borderRadius: 4,
        textAlign: 'center',
        backgroundColor: theme.theme,
        fontSize: 12,
        color: '#fff'
    }
})

export default MovieItem