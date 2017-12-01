import React from "react";
import "./Citylist.scss";
import TheHead from '../TheHead'
import { connect } from "react-redux";
class Citylist extends React.Component {
    constructor() {
        super();
        this.state = {
            
        }
    }

    componentWillMount() {

        this.props.changeHead()
        this.props.getcitylist()
    }

    render() {
        
        var citylistcontent=(()=>{
            var list = [];
            for (var ikey in this.props.citylist){
                list.push(
                    <div className="citycategory" key={ikey}>
                        <div className="citytitle">{ ikey.toUpperCase() }</div>
                        <ul className="citybox">
                        {
                           this.props.citylist[ikey].map((item,index)=>
                                    <li className="percity" key={index} onClick={this.hotcityclick.bind(this, item)}>{ item.slice(-1) == "市" ? item.slice(0, -1) : item }</li>
                        ) 
                        }
                            
				        </ul>
                    </div>
                )
            }
            return list
        })()

        return (
            <div id="citylist">
                <TheHead></TheHead>
                {
                    !this.props.citylist?null:
                        <div className="citylist">
                            <div className="nowcity citycategory">
                                <div className="nowcity-t">
                                    <img src="http://m.heyhou.com/static/images/icon-map.png" />
                                    <span>{this.props.city}</span>
                                </div>
                                <div className="country">
                                    <ul className="citybox">
                                        <li className="percity" onClick={this.hotcityclick.bind(this,'全国')}>全国</li>
					                </ul>
                                </div>
                            </div>
                            <div className="hotcity citycategory">
                                <div className="citytitle">热门城市</div>
                                <ul className="citybox">
                                {
                                    this.props.hotcity.map((item,index)=>
                                            <li key={index} className="percity" onClick={this.hotcityclick.bind(this, item)}>{ item.slice(-1) == "市" ? item.slice(0, -1) : item }</li>
                                    )
                                }   
				                </ul>
			                </div>
                            {citylistcontent}
			                
		                </div>
                }
            </div>
        )
    }

     hotcityclick(city){
        this.props.changeCity(city)
        this.props.history.push(`/home`); 
            
    } 


}

export default connect(
    (state) => {
        return {
            city: state.City,
            citylist: state.cityControl.cityList,
            hotcity: state.cityControl.hotCity
        }
    },
    {
        changeHead: () => {
            return {
                type: "changeHead",
                payload: {
                    headback: true,
                    headtitle: "选择城市",
                    headselectcity: false,
                    headtosearch: false,
                    headcllect: false,
                    headsearch: false,
                    headcancle: false,
                }
            }
        },
        getcitylist: () => {
            return (dispatch) => {
                axios.get("/app2/city/get_city_list").then(res => {
                    console.log(res.data.data)
                    dispatch({
                        type: "getcitylist",
                        payload: res.data.data
                    })
                })
            }
        },
        changeCity: (city) => {
            return {
                type: "changeCity",
                payload: city
            }
        }
        
    }

)(Citylist);