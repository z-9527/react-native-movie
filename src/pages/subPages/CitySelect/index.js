import React from 'react'
import { View, Text, SectionList, StyleSheet } from 'react-native'
import { get } from '../../../utils/ajax'
import NetError from '../../../components/NetError'
import theme from '../../../theme/defalut'
import { connect } from 'react-redux'

//没有获取热门城市的接口所以写个假的
const hotCity = [
    {id: 10, nm: '上海', py: 'shanghai'},
    {id: 1, nm: '北京', py: 'beijing'},
    {id: 20, nm: '广州', py: 'guangzhou'},
    {id: 30, nm: '深圳', py: 'shenzhen'},
    {id: 57, nm: '武汉', py: 'wuhan'},
    {id: 40, nm: '天津', py: 'tianjin'},
    {id: 42, nm: '西安', py: 'xian'},
    {id: 55, nm: '南京', py: 'nanjing'},
    {id: 50, nm: '杭州', py: 'hangzhou'},
    {id: 59, nm: '成都', py: 'chengdu'},
    {id: 45, nm: '重庆', py: 'chongqing'},
]

class CitySelect extends React.Component {
    static navigationOptions = {
        title: '城市选择'
    }
    state = {
        cityList: [],       //城市列表
        locationCity: {},   //定位城市
    }

    componentDidMount () {
        this.getCitylist()
    }

    getCitylist = async () => {
        const res = await get('https://maoyan.com/ajax/cities')
        this.setState({
            locationCity: res.geoCity || {},
            cityList: this._handleCityList(res.letterMap || {})
        })
    }
    _handleCityList = (obj) => {
        const list = []
        for (let [key, value] of Object.entries(obj)) {
            list.push({
                title: key,
                data: value,
            })
        }
        //添加热门城市,
        list.unshift({
            title: '热门城市',
            data: [hotCity],
        })
        //添加定位城市
        list.unshift({
            title: '当前定位城市',
            data: [[this.props.city.nm ? this.props.city : {nm: '正在定位...'}]],
        })
        return list
    }
    _renderItem = ({item}) => {
        const isArr = Array.isArray(item)
        return (
            <View style={isArr ? styles.sectionRowItem : styles.sectionColumnItem}>
                {
                    isArr ? item.map(i => <Text key={i.nm} style={styles.rowText}
                                                onPress={() => this.selectCity(i)}>{i.nm}</Text>) :
                        <Text onPress={() => this.selectCity(item)}>{item.nm}</Text>
                }
            </View>
        )
    }
    selectCity = (item) => {
        const a = Date.now()
        this.props.dispatch({
            type: 'SET_CITY',
            city: item
        })
        this.props.navigation.navigate('Home')
    }

    render () {
        const {cityList} = this.state
        return (
            <NetError>
                <View style={{flex: 1}}>
                    <SectionList
                        sections={cityList}
                        renderItem={this._renderItem}
                        renderSectionHeader={({section}) => <Text style={styles.sectionTitle}>{section.title}</Text>}
                        keyExtractor={(item) => `${item.nm}`}
                    />
                </View>
            </NetError>
        )
    }
}

const styles = StyleSheet.create({
    sectionTitle: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        fontSize: 15,
        color: '#666',
        backgroundColor: theme.fillColor
    },
    sectionColumnItem: {
        justifyContent: 'center',
        height: 40,
        marginRight: 15,
        marginLeft: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.borderBottomColor,
    },
    columnText: {
        flex:1
    },
    sectionRowItem: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        borderBottomColor: theme.borderBottomColor,
        borderBottomWidth: 0.5,
        paddingBottom: 15
    },
    rowText: {
        height: 40,
        width: '26%',
        borderWidth: 1,
        borderColor: theme.borderBottomColor,
        borderRadius: 3,
        marginTop: 15,
        marginRight: '4%',
        textAlign: 'center',
        lineHeight: 40,
    },

})

export default connect((state) => {
    return {city: state.city}
})(CitySelect)