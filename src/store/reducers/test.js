const test = (state=0,action)=>{
    switch(action.type){
        case 'ADD': return 1
        default :return state
    }

}
export default test