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
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import zoom from "../../icons_pierreangot/add.png";
import unzoom from "../../icons_pierreangot/minus.png";
import previous from "../../icons_pierreangot/back.png";
import next from "../../icons_pierreangot/next.png";
import downloadIcon from "../../icons_pierreangot/file.png";
import close from "../../icons_pierreangot/cancel.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Displayer(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1);
    let location = useLocation();
    let query = new URLSearchParams(location.search);
    let file = query.get("file");
    let ele;
    let pos;

    useEffect(() => {
    }, []);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1)
    }

    function nextPage() {
        changePage(1)
    }

    function upScale() {
        setScale((prev) => prev + 0.2)
    }

    function downScale() {
        setScale((prev) => prev - 0.2)
    }

    function downLoadLink() {
        document.getElementById("download-link").click();
    }

    const pages = <Page pageNumber={pageNumber}
    scale={scale}
    height={document.documentElement.clientHeight * 0.8} 
        />
    

    return (
        <div className="display-wrapper">
            <div id={`${props.format}doc-wrapper`} className={`${props.format}doc-wrapper`} style={{marginLeft: "0", width: "100vw", overflow: "auto", backgroundColor: "transparent"}}>
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="tabl-doc"
                    error="Failure to load / Erreur de chargement"
                    loading={
                        <h1 id="loading">Loading / Chargement</h1>
                    }
                    >
                    {pages}
                </Document>
            </div>
            <button id={`${props.format}close`} onClick={() => window.history.back()}>
                <img src={close} id="close-img" height="32px" />
            </button>
            <a
                id="download-link"
                className="download-link"
                download={file}
                href={file}
            ></a>
            <p id="page-counter">
                Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </p>
            <div id={`${props.format}btn-container-left`} style={{flexDirection: "row", height: "50px", width: "70vw", top: "92vh", left: "15vw"}}>
                <button
                    className={`${props.format}doc-nav-button previous-btn`} 
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                    style={{height: "100%", width: "70px"}}
                >
                    <img src={previous} />
                </button>
                <button
                    className={`${props.format}doc-nav-button next-btn`} 
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                    style={{height: "100%", width: "70px"}}

                >
                    <img src={next} />
                </button>
                <button
                    className={`${props.format}doc-nav-button download-button`} 
                    type="button"
                    onClick={downLoadLink}
                    style={{height: "100%", width: "70px"}}

                >


                    <img src={downloadIcon} />
                </button>
            </div>
        </div>
    );
}

export default Displayer;