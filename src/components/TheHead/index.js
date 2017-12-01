import React from "react";
import "./TheHead.scss";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
class TheHead extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return <div className="homehead">
                {
                this.props.headstyle.headback ? <div className="head-l" >
			                               <img src="http://m.heyhou.com/static/images/icon-back.png" onClick={this.gobackClick.bind(this)} />
                                        </div>
                                    :null
                
                }
            {
                this.props.headstyle.headtitle ?
                    <div className="head-c">{this.props.headstyle.headtitle}</div>
                    : null
            }
            {
                this.props.headstyle.headsearch ?
                    <div className = { this.props.headstyle.headcancle ? 'headsearch longer' : 'headsearch'}>
                        <input type="text" placeholder="请输入演出、地点" ref="keyword" />
                        <button onClick={this.searchClick.bind(this)} >
                            <img src="http://m.heyhou.com/static/images/icon-nav-search.png" title="搜索" alt="搜索" />
                        </button>
                    </div>
                    : null
            }
            <div className="head-r">
                {
                    this.props.headstyle.headselectcity ?
                        <NavLink to="/citylist" className="city">{this.props.city.slice(-1) == "市" ? this.props.city.slice(0, -1) : this.props.city }<img className="xiajian" src="http://m.heyhou.com/static/images/icon-back.png" /></NavLink>
                        : null
                }
                {
                    this.props.headstyle.headtosearch ?
                        <NavLink to="/ticketsearch">
                            <img className="fang" src="http://m.heyhou.com/static/images/icon-search-enty.png" />
                        </NavLink>
                        : null
                }
                {
                    this.props.headstyle.headcllect ?
                        <NavLink to="/user">
                            <img className="xing" src="http://m.heyhou.com/static/images/ticket-detail-collection.png" />
                        </NavLink>
                        : null
                }
                {
                    this.props.headstyle.headcancle ?
                        <NavLink to="/home" className="childmsg.headcancle">
                            返回首页
			    </NavLink>
                        : null
                }
            </div> 
	</div>
    }

    gobackClick(){
        window.history.go(-1)
    }
    searchClick(){
        //console.log(this.refs.keyword.value)
        this.props.getticketlist(this.refs.keyword.value)
    }
}

export default connect(
    (state) => {
        return {
            headstyle: state.headControl,
            city:state.City
        }
    },

    {
        getticketlist: (keyword) => {
            return (dispatch) => {
                axios.get("/app2/perform/search?page=1&pageSize=10000&keyword=" + keyword).then(res => {
                    dispatch({
                        type: "getticketlist",
                        payload: res.data.data ? res.data.data[0].content : []
                    })
                })
            }
        }
    }

)(TheHead);