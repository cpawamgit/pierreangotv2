import './App.css';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useLocation,
  useHistory
} from "react-router-dom";
import datas from "./site.json";
import { Document, Page, pdfjs } from 'react-pdf';
import PcLandscape from "./pclandscape";
import PcPortait from "./pcportrait";
import TabletLandscape from './tabletlandscape';
import TabletPortait from './tabletportrait';
import PhoneLandscape from './phonelandscape';
import PhonePortait from './phoneportrait';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width : document.documentElement.clientWidth,
      height : document.documentElement.clientHeight,
      language : "fr",
    }
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount(){
    window.addEventListener('resize', this.refresh);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.refresh);
  }

  refresh(){
    this.setState({
      width : document.documentElement.clientWidth,
      height : document.documentElement.clientHeight,
    });
  }

  checkRatio(){
    let big = this.state.width > this.state.height ? this.state.width : this.state.height;
    let small = this.state.width <= this.state.height ? this.state.width : this.state.height;
    return ({ratio: big / small, size: big + small});
  }

  chooseDisplay(ratio, size){
    let toDisplay = null;
    if (ratio < 1.6){
      toDisplay = this.state.width > this.state.height ? <TabletLandscape language={this.state.language}/> : <TabletPortait language={this.state.language}/>
    } else if (size >= 1500){
      toDisplay = this.state.width > this.state.height ? <PcLandscape language={this.state.language}/> : <PcPortait language={this.state.language}/>
    } else {
      toDisplay = this.state.width > this.state.height ? <PhoneLandscape language={this.state.language}/> : <PhonePortait language={this.state.language}/>
    }
    return toDisplay;
  }

  render() {
    let {ratio, size} = this.checkRatio();
    let toDisplay = this.chooseDisplay(ratio, size);
    return (
      <div className="App">
        {toDisplay}
      </div>
    );
  }
}

export default App;
