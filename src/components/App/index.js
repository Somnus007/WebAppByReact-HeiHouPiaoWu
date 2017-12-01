import React from "react";
import "./App.scss";
import "@/assets/public.css"

class App extends React.Component {
    constructor() {
        super();
        this.state = {
           
        }
    }

    render() {
        return <div>

            {
                //下面就是子组件加载的位置，
            }

            <section>
                {
                    this.props.children
                }
            </section>
        </div>
    }
}

export default App;