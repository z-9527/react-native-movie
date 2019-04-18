import React from 'react'
import { View,Text,SectionList} from 'react-native'
import {get} from '../../../utils/ajax'
import {connect} from 'react-redux'

class NextList extends React.Component{
    state = {
        mostExpectedList:[],    //最受期待的电影列表
        comingList:[],      //将要上映的电影列表
    }

    getMostExpectedList = async ()=>{
    }
    test = ()=>{
        this.props.dispatch((a)=>{
            console.log(a)

        })
    }

    render(){
        console.log(this.props)
        return (
            <View>
                <View>
                    <Text onPress={this.test}>近期最受期待</Text>
                </View>
                <SectionList
                    renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={{ fontWeight: "bold" }}>{title}</Text>
                    )}
                    sections={[
                        { title: "Title1", data: ["item1", "item2"] },
                        { title: "Title2", data: ["item3", "item4"] },
                        { title: "Title3", data: ["item5", "item6"] },

                    ]}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        )
    }
}

export default connect((state)=>{
    return {...state}
})(NextList)