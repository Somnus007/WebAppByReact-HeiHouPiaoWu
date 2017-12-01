import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Cart from "./components/Cart";
import Citylist from "./components/Citylist";
import Ticketsearch from "./components/Ticketsearch";
import {Provider}  from "react-redux";
import store  from "./Redux/Store";
/*
	Vue:
	mode :history    /home 
	mode : hash      #/home

	React :

	BrowserRouter   /home
	HashRouter     #/home
 */
const router = (
	<Provider store={store}>
	<Router>		
		<App>
			 <Switch>
			 	{
			 		//switch 只加载匹配路径的第一个孩子
			 	}
				<Route path="/home" component={Home}/>
				{/* <Route path="/film" render={()=>

					<Film>
						<Switch>
							<Route path="/film/nowplaying" component={Nowplaying}/>
							<Route path="/film/comingsoon" component={Comingsoon}/>
							<Redirect from="/film" to="/film/nowplaying"/>
						</Switch>
					</Film>
				}/>*/}
				<Route path="/cart" component={Cart} /> 
				<Route path="/citylist" component={Citylist} /> 
				<Route path="/detail/:performid" component= {Detail}/> 
				<Route path="/ticketsearch" component={Ticketsearch} /> 
				<Redirect from="*" to="/home"/>
			</Switch>
		</App>
	</Router>
	</Provider>
)


export default router;