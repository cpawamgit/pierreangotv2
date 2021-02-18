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

function FileBrowser() {
  return (
    <div className="browse-wrapper">
      <Browse />
    </div>
  );
}



function Browse(params) {
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
    backButton = <Link className="link" to={tmp}><button className="back-btn">Back</button></Link>
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
          <Link onClick={scrollToTop} className="link folder-link" key={`${item.name}`} to={`${url}/${item.name}`}><button className="folder-btn">{item.name}</button></Link>
        );
      } else {
        return (
          <Link onClick={scrollToTop} className="link file-link" key={`${item.name}`} to={`/displayer?file=/${dirPath.join("/")}/${item.name}`}><button className="file-btn">{item.name}</button></Link>
        );
      }
    });
    let buttonWrapper = <div className="btn-wrapper">
      {backButton}
      {buttons}
    </div>
    return (
      <div className="app-wrapper">
        {actualPath === url && buttonWrapper}
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="btns"
            timeout={300}
            appear={true}
          >
            <Switch location={location}>
              <Route path={`${url}/:id`} children={<Browse />} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
}

export default FileBrowser;