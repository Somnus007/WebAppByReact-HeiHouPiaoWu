import React from "react";
import "./Home.scss";
import TheHead from '../TheHead'
import ReactSwipe from 'react-swipe';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            jiantou: true,
            categoryArr:[],
            currentpage:1
        }
    }

    componentWillMount() {

        this.props.changeHead()
        this.props.getbannerlist(this.props.city)
        this.props.gethotlist(this.props.city)
        this.props.getperformlist(this.props.city, this.state.categoryArr)
        this.props.getcategory()
        //console.log(window.localStorage.cart)
        var cartsum=0,cartlist;
        if (!window.localStorage.cart){
            window.localStorage.setItem("cart",JSON.stringify([]))
            cartlist = []
        }else{
            cartlist = JSON.parse(window.localStorage.cart)
            for(var i=0;i<cartlist.length;i++){
                cartsum += parseInt(cartlist[i].buyNum)
            }
        }
       
        this.props.goodsfix(cartlist)
        this.props.sumfix(cartsum)
    }

    render() {
        let bannerContent, hotContent,categoryContent,performContent,jiantouderaction, minheightul, thered,categoryshow
        bannerContent=(()=>{
            if (this.props.bannerlist.length != 0) {
                return (

                    <ReactSwipe className="carousel" swipeOptions={{ continuous: true, auto: 2000, stopPropagation:true}} key={this.props.bannerlist.length}>
                        {
                            this.props.bannerlist.map((item, index) =>
                                <div onClick={this.bannerClick.bind(this, item.protocol)} className="pic" key={index} style={{ backgroundImage: `url(${item.fileKey})` }} ></div>
                            )
                        }
                    </ReactSwipe>
                )
            }
        })()

        hotContent = (() => {
            if (this.props.hotlist.length != 0) {
                return (
                    <div className="hot">
                        <h3>热门推荐</h3>
                        <div className="slidex">
                            <ul>
                                {
                                    this.props.hotlist.map((item, index) =>
                                        <li key={index} onClick={this.hotClick.bind(this, item.id)}>
                                            <img src={item.coverPicture} />
                                            <p>{item.name}</p>
                                            <span>{item.startTime}</span>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        })()

        if (this.state.jiantou) {
            jiantouderaction = "downjian"
            minheightul = "minheightul"
        } else {
            jiantouderaction = "upjian"
            minheightul = ''
        }

        categoryshow = (() => {
            if (this.state.jiantou == false) {
                return (
                    <div className="categorytitle" >分类</div>
                )
            }
        })()

        categoryContent = (() => {
            if (this.props.categorylist.length != 0) {
                return (
                    <ul className={minheightul}>
                        <li className='thered' onClick={this.categoryClick.bind(this)} >全部</li>
                        {
                            this.props.categorylist.map((item, index) =>
                                <li onClick={this.percategoryClick.bind(this,item.id)} key={item.id}>{item.name}</li>
                            )
                        }

                    </ul>
                )
            }
        })()

        var totalpage = Math.ceil(this.props.performlist.length/10)
        var prepage,nextpage;
        if (this.state.currentpage == 1) {
            prepage = "disabledprepage"
        }else{
            prepage = "prepage"
        }
        if (this.state.currentpage == totalpage) {
            nextpage = "disablednextpage"
        } else {
            nextpage = "nextpage"
        }

        performContent = (() => {
            
            if (this.props.performlist.length != 0) {
                return (
                    <div className="performlist">
			            <ul>
                            {
                                this.props.performlist.slice((this.state.currentpage - 1) *10, (this.state.currentpage - 1) * 10 + 10).map((item, index) =>
				            <li key={index}>
					            <div className = "listbox" onClick={this.performlistClick.bind(this,item.id)} >
						            <div className = "list-l" >
							            <img src={item.coverPicture} />
                                        {
                                            item.ticketStatus==1?
                                            <p className="status">待定</p>
                                            :null
                                        }
                                        {
                                            item.ticketStatus==2?
                                            <p className = "status"> 预售中 </p>
                                            :null
                                        }
                                        {
                                            item.ticketStatus==3?
                                            <p className="status">售票中</p>
                                            :null
                                        }
                                        {
                                            item.ticketStatus==4?
                                            <p className = "status"> 已过期 </p>
                                            :null
                                        }
						            </div>
						            <div className = "list-r" >
							            <div className = "list-rt" >
								            <p className="name">{item.name}</p>
							            </div>
							            <div className = "list-rc">
								            <p className="place">{item.cityPlace}</p>
								            <p className="datetime">{item.startTime}-{item.endTime}</p>
							            </div>
							            <div className = "list-rb" >
								            <p className="price"><b>{item.floorPrice}</b> 元</p>
							            </div>
						            </div>
					            </div>
					            <div className="buyit" onClick={this.buyitClick.bind(this,item)}>加入购物车</div>
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


            
        
        
        return (
            <div id="home">
                <TheHead></TheHead>
                <NavLink to="/cart" className="tosuer">购物车<span>{this.props.cartsum}</span></NavLink>
                <div className="banner">
                    {bannerContent}
                </div>
                {hotContent}
                <div className="totransfer">
                    <div className="totransferbox"><img src="http://m.heyhou.com/static/images/transfer-ticket-rule.png" /></div>
                </div>
                <div className="performtitle">
                    <h3>演出</h3>
                </div>
                <div className="category">
                    <div className="youjian" onClick={this.jiantouclick.bind(this)}>
                        <img className={jiantouderaction} src="http://m.heyhou.com/static/images/icon-back.png" />
                    </div>
                    {categoryshow}
                    <div className="categorylist">
                        {categoryContent}

                    </div>
                </div>
                {performContent}
                <div className = "foot" >
                    <h3> 深圳嘿吼文化发展有限公司 </h3>
                    <p>嘿吼文化力于成为引领华语圈潮流新文化的领导者，从中国首个泛嘻哈APP的推出为起点，推进构建一个集潮流社群、IP孵化、艺人经纪、和社交商业于一体的泛娱乐生态圈，及合作共赢的跨行业平台。</p>
                    <p className = "foottext" > 嘿吼APP是深圳嘿吼文化发展有限公司旗下的移动互联网应用 </p>
                    <p>深圳市南山区后海中心路3333号中铁南方总部大厦1402</p>
                    <p className = "foottel" > 客服电话： 4000 88 2626 </p>
                </div>
            </div>
        )
    }

    bannerClick(url){
        if (url.indexOf("keyword")==-1){
            let id = url.split("?")[1].split("&")[0].split('=')[1]
            this.props.history.push(`/detail/${id}`); 
        }else{
            let keyword = url.split("?")[1].split("&")[1].split('=')[1]
            this.props.history.push(`/ticketsearch?keyword=${keyword}`); 
        }
            
    }
    hotClick(id){
        this.props.history.push(`/detail/${id}`); 
    }
    jiantouclick(){
        this.setState({
            jiantou:!this.state.jiantou
        })
    }
    categoryClick(e){
        var lis = e.target.parentNode.children
        if (this.state.categoryArr.length!=0){
            this.setState({
                categoryArr: [],
                currentpage:1
                },
                ()=>{
                    
                    for (var i = 0; i < lis.length; i++) {
                        if (i == 0) {
                            lis[i].setAttribute('class', 'thered')
                        } else {
                            lis[i].removeAttribute('class');
                        }
                    }
                    this.props.getperformlist(this.props.city, this.state.categoryArr)
                }
            )
            
            
        }
       
    }
    percategoryClick(id,e){
        
        this.setState({
                    currentpage: 1
                })
        if (this.state.categoryArr.indexOf(id)==-1){
            if (this.state.categoryArr.length == 0) {
                e.target.parentNode.firstElementChild.removeAttribute('class'); 
            }
            this.state.categoryArr.push(id)
            e.target.setAttribute('class','thered')
        }else{
            this.state.categoryArr.splice(this.state.categoryArr.indexOf(id), 1);
            e.target.removeAttribute('class');
            if (this.state.categoryArr.length == 0) {
                e.target.parentNode.firstElementChild.setAttribute('class', 'thered')
            }  
        }

        this.props.getperformlist(this.props.city, this.state.categoryArr)
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

    performlistClick(id){
        this.props.history.push(`/detail/${id}`); 
    }

    buyitClick(item){
        /* console.log(item)
        console.log(this.props.cartlist) */
        var isHave = false;
        var newlist = [...this.props.cartlist]
        var newsum = parseInt(this.props.cartsum)+1
        for (var i = 0; i < newlist.length;i++){
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
            city: state.City,
            bannerlist:state.homecontrol.homebanner,
            hotlist: state.homecontrol.homehot,
            performlist: state.homecontrol.homeperform,
            categorylist: state.homecontrol.homecategory,
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
                    headback: true,
                    headtitle: "票务",
                    headselectcity: true,
                    headtosearch: true,
                    headcllect: false,
                    headsearch: false,
                    headcancle: false
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
        getbannerlist:(city)=>{
            return (dispatch) => {
                axios.get("/app2/perform/get_perform_banner?city="+city).then(res => {
                    

                    dispatch({
                        type: "getbannerlist",
                        payload: res.data.data.length != 0 ? res.data.data : [{ fileKey: "http://m.heyhou.com/static/images/default-cover.png" }, { fileKey: "http://m.heyhou.com/static/images/default-cover.png" }]
                    })
                })
            }
        },
        gethotlist: (city) => {
            return (dispatch) => {
                axios.get("/app2/perform/get_hot_recommend_perform?page=1&pageSize=50&city=" + city).then(res => {
                    

                    dispatch({
                        type: "gethotlist",
                        payload: res.data.data ? res.data.data[0].content:[]
                    })
                })
            }
        },
        getperformlist: (city,categoryArr) => {
            var url='';
            if (categoryArr.length==0){
                url = "/app2/perform/search?page=1&pageSize=10000&city=" + city
            }else{
                var categoryStr = categoryArr.join("|")
                url = "/app2/perform/search?page=1&pageSize=10000&categoryIds=" + categoryStr + "&city=" + city
            }
            return (dispatch) => {
                axios.get(url).then(res => {
                    dispatch({
                        type: "getperformlist",
                        payload: res.data.data ? res.data.data[0].content : []
                    })
                })
            }
        },
        getcategory: () => {
            return (dispatch) => {
                axios.get("/app2/perform/perform_category").then(res => {
                    dispatch({
                        type: "getcategorylist",
                        payload: res.data.data 
                    })
                })
            }
        }
    }

)(Home);