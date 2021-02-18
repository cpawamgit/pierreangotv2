import React, { useState, useEffect } from "react";
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
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { CSSTransition, TransitionGroup } from "react-transition-group";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
  let query = new URLSearchParams(location.search);
  let isFile = query.has("file");
  let actualPath = location.pathname;
  let jsonPath = [...datas];
  let dirPath = url.split("/");
  dirPath = dirPath.slice(2);
  let backButton = null;
  let buttonClass = null;

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', dragFunctionfunction);
    return () => {document.removeEventListener('DOMContentLoaded', dragFunctionfunction)};
  }, []);

  function dragFunctionfunction() {
    const ele = document.getElementById('doc-wrapper');
    ele.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e) {
      ele.style.cursor = 'grabbing';
      ele.style.userSelect = 'none';

      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
      ele.style.cursor = 'grab';
      ele.style.removeProperty('user-select');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    ele.addEventListener('mousedown', mouseDownHandler);
  }

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

  if (!isFile) {
    let buttons = jsonPath.map(item => {
      if (item.type === "dir") {
        return (
          <Link onClick={scrollToTop} className="link folder-link" key={`${item.name}`} to={`${url}/${item.name}`}><button className="folder-btn">{item.name}</button></Link>
        );
      } else {
        return (
          <Link onClick={scrollToTop} className="link file-link" key={`${item.name}`} to={`${url}?file=${item.name}`}><button className="file-btn">{item.name}</button></Link>
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
  } else {
    let buttons = jsonPath.map(item => {
      return (
        <Link onClick={scrollToTop} className="link file-link" key={`${item.name}`} to={`${url}?file=${item.name}`}><button className="file-btn" >{item.name}</button></Link>
      );
    });
    let buttonWrapper = <div className="btn-wrapper">
      {backButton}
      {buttons}
    </div>
    let fName = query.get("file");
    let isDisplayed = actualPath === url ? true : false;
    return (
      <div className="app-wrapper">
        {isDisplayed && buttonWrapper}
        {isDisplayed && <Displayer fName={`/${dirPath.join("/")}/${fName}`} />}
        <Switch>
          <Route path={`${url}/:id`}>
            <Browse />
          </Route>
        </Switch>
      </div>
    )
  }
}

function Displayer(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [buttonOpacity, setButtonOpacity] = useState(0.2);
  const [scale, setScale] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function upButtonOpacity() {
    setButtonOpacity(1);
  }

  function downButtonOpacity() {
    setButtonOpacity(0.2);
  }

  function upScale() {
    setScale((prev) => prev + 0.2)
  }

  function downScale() {
    setScale((prev) => prev - 0.2)
  }


  const pages = props.fName.match(/a3/i) ?
    <Page pageNumber={pageNumber}
      scale={1}
      height={document.documentElement.clientHeight} />
    :
    <div className="double-pdf">
      <Page pageNumber={pageNumber}
        scale={scale}
        height={document.documentElement.clientHeight} />
      <Page pageNumber={pageNumber + 1}
        scale={scale}
        height={document.documentElement.clientHeight} />
    </div>;

  return (
    <div className="display-wrapper">
      <div id="doc-wrapper" className="doc-wrapper">
        <Document
          file={props.fName}
          onLoadSuccess={onDocumentLoadSuccess}
          onMouseEnter={upButtonOpacity}
          onMouseLeave={downButtonOpacity}
          className="doc"
        >
          {pages}
        </Document>
      </div>
      <div id="btn-container"
        onMouseEnter={upButtonOpacity}
        onMouseLeave={downButtonOpacity}
      >
        <p id="page-counter">
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
          id="previous-btn"
          
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
          id="next-btn"
          
        >
          Next
        </button>
        <button
          id="zoom"
          type="button"
          onClick={upScale}
          
        >
          zoom
        </button>
        <button
          id="unzoom"
          type="button"
          onClick={downScale}
          
        >
          unzoom
        </button>
      </div>
    </div>
  );
}

export default FileBrowser;