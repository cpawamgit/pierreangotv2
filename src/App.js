import './App.css';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { useState } from "react";
import {
  HashRouter as Router,
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
    this.toggleLanguage = this.toggleLanguage.bind(this);
  }

//   cachedImages = async (srcArray) => {
//     const promises = await srcArray.map((src) => {
//         return new Promise(function (resolve, reject) {
//             const img = new Image();

//             img.src = src;
//             img.onload = resolve();
//             img.onerror = reject();
//         });
//     });

//     await Promise.all(promises);
// };

toggleLanguage(){
  this.setState((prevState) => {
    return {language: prevState.language === "fr" ?  "en" : "fr"};
  })
}

  componentDidMount(){
    window.addEventListener('resize', this.refresh);
    // let arr = ['concert3.jpg'];    
    // this.cachedImages(arr);
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
      toDisplay = this.state.width > this.state.height ? <TabletLandscape language={this.state.language} toggleLanguage={this.toggleLanguage}/> : <TabletPortait language={this.state.language} toggleLanguage={this.toggleLanguage}/>
    } else if (size >= 1500){
      toDisplay = this.state.width > this.state.height ? <PcLandscape language={this.state.language} toggleLanguage={this.toggleLanguage}/> : <PcPortait language={this.state.language} toggleLanguage={this.toggleLanguage}/>
    } else {
      toDisplay = this.state.width > this.state.height ? <PhoneLandscape language={this.state.language} toggleLanguage={this.toggleLanguage}/> : <PhonePortait language={this.state.language} toggleLanguage={this.toggleLanguage}/>
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
