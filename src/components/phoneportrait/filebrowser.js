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
import datas from "../../site.json";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import previousFolder from "../../icons_pierreangot/folder.png";

function FileBrowser(props) {
  console.log(props.format)
  return (
    <div className={`${props.format}browse-wrapper`} style={{width: "90vw"}}>
      <Browse format={props.format}/>
    </div>
  );
}



function Browse(props) {
  let location = useLocation();
  let history = useHistory();
  let { url } = useRouteMatch();
  let actualPath = location.pathname;
  let jsonPath = [...datas];
  let dirPath = url.split("/");
  dirPath = dirPath.slice(2);
  let backButton = null;
  let buttonClass = null;

  function scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  if (dirPath.length > 1) {
    let tmp = url.split("/");
    tmp.pop();
    tmp = tmp.join("/");
    backButton = <Link className="link back-link" to={tmp}><button className={`${props.format}back-btn`}><img src={previousFolder}/></button></Link>
  }

  try {
    for (let i = 0; i < dirPath.length; i++) {
      jsonPath = jsonPath.find(item => item.name === dirPath[i]).content;
    }

  } catch (err) {
    return <h1>File not found / Fichier non trouvé</h1>
  }

    let buttons = jsonPath.map(item => {
      if (item.type === "dir") {
        return (
          <Link onClick={scrollToTop} className="link folder-link" key={`${item.name}`} to={`${url}/${item.name}`}><button className={`${props.format}folder-btn`} style={{height: "12vh", width: "28vw"}}><p style={{fontSize: "calc(2vw + 1vh)"}}>{item.name}</p></button></Link>
        );
      } else {
        return (
          <Link onClick={scrollToTop} className="link file-link" key={`${item.name}`} to={`/displayer?file=/${dirPath.join("/")}/${item.name}`}><button className={`${props.format}file-btn`} style={{height: "24vh", width: "36vw"}}><p style={{fontSize: "calc(2vw + 1vh)"}}>{item.name}</p></button></Link>
        );
      }
    });
    let buttonWrapper = <div className="btn-wrapper">
      {buttons}
    </div>
    return (
      <div className="app-wrapper">
        {actualPath === url && backButton}
        {actualPath === url && buttonWrapper}
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="btns"
            timeout={300}
            appear={true}
          >
            <Switch location={location}>
              <Route path={`${url}/:id`} children={<Browse format={props.format}/>} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
}

export default FileBrowser;