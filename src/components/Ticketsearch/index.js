import React from "react";
import "./Ticket.scss";
import TheHead from '../TheHead'
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
class Ticket extends React.Component {
    constructor() {
        super();
        this.state = {
            currentpage : 1
        }
    }

    componentWillMount() {
        this.props.changeHead()
        let keyword;
        keyword = this.props.location.search ? decodeURIComponent(this.props.location.search.split('=')[1]) :""
        this.props.getticketlist(keyword)
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

        var totalpage = Math.ceil(this.props.ticketlist.length / 10)
        var prepage, nextpage;
        if (this.state.currentpage == 1) {
            prepage = "disabledprepage"
        } else {
            prepage = "prepage"
        }
        if (this.state.currentpage == totalpage) {
            nextpage = "disablednextpage"
        } else {
            nextpage = "nextpage"
        }

        let performContent = (() => {
            
            if (this.props.ticketlist.length != 0) {
                return (
                    <div className="performlist">
			            <ul>
                            {
                                this.props.ticketlist.slice((this.state.currentpage - 1) *10, (this.state.currentpage - 1) * 10 + 10).map((item, index) =>
				            <li key={index}>
					            <div className = "listbox" onClick={this.ticketlistClick.bind(this,item.id)} >
						            <div className = "list-l" >
							            <img src={item.coverPicture} />
                                        {
                                            item.ticketStatus==1?
                                            <p className="status">待定</p>
                                            :null
                                        }
                                        {
                                            item.ticketStatus==2?
                                            <p className = "status" > 预售中 </p>
                                            :null
                                        }
                                        {
                                            item.ticketStatus==3?
                                            <p className="status">售票中</p>
                                            :null
                                        }
                                        {
                                            item.ticketStatus==4?
                                            <p className = "status" > 已过期 </p>
                                            :null
                                        }
						            </div>
						            <div className = "list-r" >
							            <div className = "list-rt" >
								            <p className="name">{item.name}</p>
							            </div>
							            <div className = "list-rc" >
								            <p className="place">{item.cityPlace}</p>
								            <p className="datetime">{item.startTime}-{item.endTime}</p>
							            </div>
							            <div className = "list-rb" >
								            <p className="price"><b>{item.floorPrice}</b> 元</p>
							            </div>
						            </div>
					            </div>
					            <div className="buyit" onClick={this.buyitClick.bind(this, item)}>加入购物车</div>
                            </li>
                                    )
                            }
                        </ul>
                        <div className="pagination-container" >
                            <div className="pagebox">
                                <div className={prepage} onClick={this.prepageClick.bind(this,this.state.currentpage,totalpage)}>上一页</div>
                                <div className="pagetext">
                                    <p><span>{this.state.currentpage}</span>/{totalpage}</p>
                                </div>
                                <div className={nextpage} onClick={this.nextpageClick.bind(this,this.state.currentpage,totalpage)}>下一页</div>
                            </div>
                        </div>
                        
		            </div>
                )
            }else{
                return (
                    <div className="performlist">
			            <ul>
				            <li className="nulllist">对不起，暂无数据！</li>
			            </ul>
                        
		            </div>
                )
            }
        })()



        return <div id="search">
            <NavLink to="/cart" className="tosuer">购物车<span>{this.props.cartsum}</span></NavLink>
            <TheHead></TheHead>
            {performContent}
        </div>
    }

    prepageClick(currentpage, totalpage) {
        if(currentpage!=1){
            this.setState({
                currentpage:this.state.currentpage-1
            })
        }
    }

    nextpageClick(currentpage, totalpage) {
        if (currentpage != totalpage) {
            this.setState({
                currentpage: this.state.currentpage + 1
            })
        }
    }

    ticketlistClick(id){
        this.props.history.push(`/detail/${id}`); 
    }

    buyitClick(item){
        /* console.log(item)
        console.log(this.props.cartlist) */
        var isHave = false;
        var newlist = [...this.props.cartlist]
        var newsum = parseInt(this.props.cartsum)+1
        for (var i = 0; i < newlist.length; i++){
            if(item.id==newlist[i].id){
                                            isHave = true
                newlist[i].buyNum = parseInt(newlist[i].buyNum)+1
            }
        }
        if(!isHave){
                                            item.buyNum = 1;
            newlist.push(item)
        }
        //console.log(newlist)
        this.props.goodsfix(newlist)
        this.props.sumfix(newsum)
        window.localStorage.cart = JSON.stringify(newlist)
    }
}

export default connect(
    (state) => {
        return {
            ticketlist: state.ticketsearch,
            cartlist: state.cartdata.list,
            cartsum:state.cartdata.sum
        }
    },
    {
        changeHead: () => {
            //自动进行dispatch 到 reducer
            return {
                type: "changeHead",
                payload: {
                    headback: false,
                    headtitle: "",
                    headselectcity: false,
                    headtosearch: false,
                    headcllect: false,
                    headsearch: true,
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
        },
        getticketlist: (keyword) => {
            return (dispatch) => {
                axios.get("/app2/perform/search?page=1&pageSize=10000&keyword=" + keyword).then(res => {
                    dispatch({
                        type: "getticketlist",
                        payload: res.data.data ? res.data.data[0].content :[] 
                    })
                })
            }
        }
    }

)(Ticket);