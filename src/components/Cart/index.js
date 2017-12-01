import React from "react";
import "./Cart.scss";
import TheHead from '../TheHead'
import { connect } from "react-redux";
class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentWillMount() {
        this.props.changeHead()
        var cartsum = 0, cartlist;
        if (!window.localStorage.cart) {
            window.localStorage.setItem("cart", JSON.stringify([]))
            cartlist = []
        } else {
            cartlist = JSON.parse(window.localStorage.cart)
            for (var i = 0; i < cartlist.length; i++) {
                cartsum += parseInt(cartlist[i].buyNum)
            }
        }

        this.props.goodsfix(cartlist)
        this.props.sumfix(cartsum)
        
    }

    render() {
        /* console.log(this.props.cartlist)
        console.log(this.props.cartsum) */
        var list = [];
        var sumpay = 0;
        if(this.props.cartlist.length==0){
            list.push(<li key="0" className="cartnulllist">您的购物车空空如也，快去<a href="/home">首页</a>逛逛吧!</li>)
        }else{
            for (var i = 0; i < this.props.cartlist.length;i++){
                sumpay += (parseInt(this.props.cartlist[i].floorPrice) * parseInt( this.props.cartlist[i].buyNum))
                list.push(
                    <li key={i}>
                        <div className="listbox">
                            <div className="list-l" >
                                <img src={this.props.cartlist[i].coverPicture} />
                            </div>
                            <div className="list-r" >
                                <div className="list-rt" >
                                    <p className="name">{this.props.cartlist[i].name}</p>
                                </div>
                                <div className="list-rc" >
                                    <p className="cartprice"><b>{this.props.cartlist[i].floorPrice}</b> 元</p>
                                    <p className="cartfix"><button onClick={this.jianClick.bind(this, this.props.cartlist[i].buyNum, this.props.cartlist[i].id)}>-</button><span>{this.props.cartlist[i].buyNum}</span><button onClick={this.jiaClick.bind(this, this.props.cartlist[i].buyNum, this.props.cartlist[i].id)}>+</button></p>
                                </div>
                            </div>
                        </div>
                        <div className="buyit" onClick={this.deloneClick.bind(this, this.props.cartlist[i].buyNum, this.props.cartlist[i].id)}>删除此商品</div>
                    </li>
                )
            }
        }

        return <div id="cart">
            <TheHead></TheHead>
            <div className="performlist">
                <ul>
                    {list}
                </ul>
            </div>
            <div className="cartspace"></div>
            <div className="cartpay">
                <div className="cartpay-l" onClick={this.delallClick.bind(this)}>清空购物车</div>
                <div className="cartpay-c">合计：￥<span>{sumpay}</span></div>
                <div className="cartpay-r">去结算({this.props.cartsum})</div>
                
            </div>
        </div>
    }

    jianClick(num,id){
        if(num!=1){
            var sum = parseInt(this.props.cartsum)
            var newlist = [...this.props.cartlist]
            num -= 1
            sum -= 1
            for (var i = 0; i < newlist.length;i++){
                if (newlist[i].id==id){
                    newlist[i].buyNum = num
                    break;
                }
            }
            this.props.goodsfix(newlist)
            this.props.sumfix(sum)
            window.localStorage.cart = JSON.stringify(newlist)
        }
    }

    jiaClick(num, id) {
            var sum = parseInt(this.props.cartsum)
            var newlist = [...this.props.cartlist]
            num += 1
            sum += 1
            for (var i = 0; i < newlist.length; i++) {
                if (newlist[i].id == id) {
                    newlist[i].buyNum = num
                    break;
                }
            }
            this.props.goodsfix(newlist)
            this.props.sumfix(sum)
            window.localStorage.cart = JSON.stringify(newlist)
    }

    deloneClick(num,id){
        var sum = parseInt(this.props.cartsum)
        var newlist = [...this.props.cartlist]
        sum = sum - num
        for (var i = 0; i < newlist.length; i++) {
            if (newlist[i].id == id) {
                newlist.splice(i,1)
                break;
            }
        }
        this.props.goodsfix(newlist)
        this.props.sumfix(sum)
        window.localStorage.cart = JSON.stringify(newlist)
    }

    delallClick(){
        if (this.props.cartsum!=0){
            this.props.goodsfix([])
            this.props.sumfix(0)
            window.localStorage.cart = JSON.stringify([])
        }
        
    }

}

export default connect(
    (state) => {
        return {
            cartlist: state.cartdata.list,
            cartsum: state.cartdata.sum
        }
    },
    {
        changeHead: () => {
            return {
                type: "changeHead",
                payload: {
                    headback: true,
                    headtitle: "购物车",
                    headselectcity: false,
                    headtosearch: false,
                    headcllect: false,
                    headsearch: false,
                    headcancle: true,
                }
            }
        },
        goodsfix: (data) => {
            return {
                type: "goodsfix",
                payload: data
            }
        },
        sumfix: (data) => {
            return {
                type: "sumfix",
                payload: data
            }
        }
    }

)(Cart);