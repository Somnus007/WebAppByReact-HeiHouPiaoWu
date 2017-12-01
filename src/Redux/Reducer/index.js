import { combineReducers } from 'redux'

var homedata = { homebanner: [], homehot: [], homecategory: [], homeperform: []}
var detaildata = {detailmain:{},detailtransfer:'',detailad:[]}
var cartdefault = {list:[],sum:0}

const City = (state = "全国", info) => {
    // console.log(info);
    let { type, payload } = info;
    switch (type) {
        case "changeCity":
            // var newstate =[...state];
            // newstate.push(payload)
            return payload;
        default:
            return state;
    }

    return state;
}

const cartdata = (state = cartdefault, info) => {
    let { type, payload } = info;
    switch (type) {
        case "goodsfix":
            return Object.assign({}, state, { list: payload });
        case "sumfix":
            return Object.assign({}, state, { sum: payload });
        default:
            return state;
    }

    return state;
}

const ticketsearch = (state = [], info) => {
    // console.log(info);
    let { type, payload } = info;
    switch (type) {
        case "getticketlist":
            // var newstate =[...state];
            // newstate.push(payload)
            return payload;
        default:
            return state;
    }

    return state;
}


const headControl = (state = {}, info) => {
    let { type, payload } = info;
    
    switch (type) {
        case "changeHead":
            return payload;
        default:
            return state;
    }
    return state;
}

const cityControl = (state = {}, info) => {
    let { type, payload } = info;

    switch (type) {
        case "getcitylist":
            return payload;
        default:
            return state;
    }
    return state;
}

const homecontrol = (state = homedata, info) => {
    let { type, payload } = info;

    switch (type) {
        case "getbannerlist":
            return Object.assign({},state,{homebanner:payload});
        case "gethotlist":
            return Object.assign({}, state, { homehot: payload });
        case "getperformlist":
            return Object.assign({}, state, { homeperform: payload });
        case "getcategorylist":
            return Object.assign({}, state, { homecategory: payload });
        default:
            return state;
    }
    return state;
}

const detailcontrol = (state = detaildata, info) => {
    let { type, payload } = info;

    switch (type) {
        case "getdetailmain":
            return Object.assign({}, state, { detailmain: payload });
        case "getdetailtransfer":
            return Object.assign({}, state, { detailtransfer: payload });
        case "getdetailad":
            return Object.assign({}, state, { detailad: payload });
        default:
            return state;
    }
    return state;
}

/* const homebanner = (state = [], info) => {
    let { type, payload } = info;

    switch (type) {
        case "getbannerlist":
            return payload;
        default:
            return state;
    }
    return state;
}

} */

let reducer = combineReducers({ headControl, City, homecontrol, detailcontrol, cityControl, ticketsearch, cartdata})
export default reducer;


// reducer 的设计必须是一个纯函数
// 
// 只要每次给定相同的输入值，就一定会得到相同的输出值: 例如传入1与2，就一定会得到3
// 不会改变原始输入参数，或是外部的环境，所以没有副作用
// 不依頼其他外部的状态，变量或常量

