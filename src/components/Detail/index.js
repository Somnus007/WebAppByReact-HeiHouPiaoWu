import React from "react";
import "./Detail.scss";
import TheHead from '../TheHead'
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentWillMount() {
        var id = this.props.match.params.performid
        this.props.changeHead()
        this.props.getdetailmain(id, this.props.getdetailad)
        this.props.getdetailtransfer(id)
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
        let advicemargin ;
        if(this.props.detailad.length==0){
            advicemargin = "ticketdetail advicemargin";
        }else{
            advicemargin = "ticketdetail";
        }
        

        return <div>
            <TheHead></TheHead>
            <NavLink to="/cart" className="tosuer">购物车<span>{this.props.cartsum}</span></NavLink>
            <div className={advicemargin}>
                <div className="detailmain">
                    <div className="detailmain-l">
                        <img src={this.props.detailmain.coverPicture} />
				    </div>
                    <div className="detailmain-r">
                            <h3>{ this.props.detailmain.name }</h3>
                        <div className="detailmain-rb">
                                {
                                    this.props.detailmain.ticketStatus == 1?
                                    <div className="detailstatus">待定</div>
                                    :null
                                }
                                {
                                    this.props.detailmain.ticketStatus == 2 ?
                                        <div className="detailstatus">预售中</div>
                                        : null
                                }
                                {
                                    this.props.detailmain.ticketStatus == 3 ?
                                        <div className="detailstatus">售票中</div>
                                        : null
                                }
                                {
                                    this.props.detailmain.ticketStatus == 4 ?
                                        <div className="detailstatus">已过期</div>
                                        : null
                                }
                                <div className="detailprice">{ this.props.detailmain.floorPrice }<span>  元</span></div>
                        </div>
                    </div>
                </div>
                <div className="timeandsite">
                    <div className="timeandsite-t">演出时间：{ this.props.detailmain.startTime }-{ this.props.detailmain.endTime }</div>
                    <div className="timeandsite-b">演出地址：{ this.props.detailmain.address }&nbsp;&nbsp;{ this.props.detailmain.place }</div>
                </div>
                {
                    this.props.detailtransfer==0?null:
                    <div className="transferticketdetail">
				        <div className="transferticketdetail-l">
                            <img src="http://m.heyhou.com/static/images/transfer-pointer.png" />查看转让票
				        </div>
                        <span>&gt;</span>
			        </div>
                }
                <div className="performtext">
				    <h3>演出详情<span>&gt;</span></h3>
                    <div className="performtext-b" dangerouslySetInnerHTML={{ __html: this.props.detailmain.description}}></div>
                </div>
                <div className="detailnotice" >
                    <div className="noticetitle">购票须知</div>
                    <div className="noticetext">{this.props.detailmain.ticketPolicy }</div>
                </div>
                {
                    this.props.detailad.length==0?null:
                    <div className="advice">
                        <h3>猜您喜欢</h3>
                        <ul>
                        {
                            this.props.detailad.map((item, index) => (
                                <li key={index} onClick={this.detailClick.bind(this,item.id)}>
					                <img src={item.coverPicture} />
						            <p>{ item.name }</p>
                                </li>
                            ))
                        }
				        </ul>
                    </div>   
                }
            </div>
            <div className="buyticket" >
                <span onClick={this.buyitClick.bind(this,this.props.detailmain)}>加入购物车</span>
            </div>
        </div>
    }

    detailClick(id){
        this.props.getdetailmain(id, this.props.getdetailad)
        this.props.getdetailtransfer(id)
        this.props.history.push(`/detail/${id}`); 
    }

    buyitClick(item) {
        var isHave = false;
        var newlist = [...this.props.cartlist]
        var newsum = parseInt(this.props.cartsum) + 1
        for (var i = 0; i < newlist.length; i++) {
            if (item.id == newlist[i].id) {
                isHave = true
                newlist[i].buyNum = parseInt(newlist[i].buyNum) + 1
            }
        }
        if (!isHave) {
            item.buyNum = 1;
            newlist.push(item)
        }
        this.props.goodsfix(newlist)
        this.props.sumfix(newsum)
        window.localStorage.cart = JSON.stringify(newlist)
    }
}

export default connect(
    (state) => {
        return {
            detailmain: state.detailcontrol.detailmain,
            detailtransfer: state.detailcontrol.detailtransfer,
            detailad: state.detailcontrol.detailad,
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
                    headtitle: "票务详情",
                    headselectcity: false,
                    headtosearch: false,
                    headcllect: true,
                    headsearch: false,
                    headcancle: false,
                }
            }
        },
        getdetailmain: (id,cb) => {
            return (dispatch) => {
                axios.get("/app2/perform/detail?id=" + id).then(res => {
                    cb(res.data.data.id, res.data.data.categoryId)
                    dispatch({
                        type: "getdetailmain",
                        payload: res.data.data
                    })
                })
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
        },
        getdetailtransfer: (id) => {
            return (dispatch) => {
                axios.get("/app2/transfer/check_perform_is_transfer?performId=" + id).then(res => {
                    dispatch({
                        type: "getdetailtransfer",
                        payload: res.data.data.isTransfer
                    })
                })
            }
        },
        getdetailad: (id,category) => {
            return (dispatch) => {
                axios.get("/app2/perform/get_correlation_perform?performId=" + id + "&categoryId=" + category+"&page=1").then(res => {
                    dispatch({
                        type: "getdetailad",
                        payload: res.data.data ? res.data.data:[]
                    })
                })
            }
        }
    }    

)(Detail);