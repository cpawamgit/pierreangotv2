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
    const [buttonOpacity, setButtonOpacity] = useState(0.2);
    const [scale, setScale] = useState(1);
    let location = useLocation();
    let query = new URLSearchParams(location.search);
    let file = query.get("file");
    let ele;
    let pos;

    useEffect(() => {
        ele = document.getElementById("doc-wrapper");
        ele.style.cursor = 'grab';
        ele.addEventListener("mousedown", activateDrag);
        return () => { ele.removeEventListener("mousedown", activateDrag) };
    }, []);

    function activateDrag(e) {
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
    }

    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy * 2;
        ele.scrollLeft = pos.left - dx * 2;
    };

    const mouseUpHandler = function () {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        if (file.match(/a3/i)){
            changePage(-1);
        } else {
            if (pageNumber - 2 >= 1){
                changePage(-2);
            } else {
                changePage(-1);
            }
        }
    }

    function nextPage() {
        if (file.match(/a3/i)){
            changePage(1);
        } else {
            if (pageNumber + 1 === numPages){
                return;
            } else if (pageNumber + 2 <= numPages - 1){
                changePage(2);
            } else {
                changePage(1);
            }
        }
        
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

    function downLoadLink() {
        document.getElementById("download-link").click();
    }


    const pages = file.match(/a3/i) ?
        <Page pageNumber={pageNumber}
            scale={scale}
            height={document.documentElement.clientHeight} />
        :
        <div className="double-pdf">
            <Page pageNumber={pageNumber}
                scale={scale}
                height={document.documentElement.clientHeight} />
            {pageNumber + 1 <= numPages && <Page pageNumber={pageNumber + 1}
                scale={scale}
                height={document.documentElement.clientHeight} />}
        </div>;

    return (
        <div className="display-wrapper">
            <div id="doc-wrapper" className="doc-wrapper">
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onMouseEnter={upButtonOpacity}
                    onMouseLeave={downButtonOpacity}
                    className="doc"
                    error="Failure to load / Erreur de chargement"
                    loading="Loading document / Chargement du document"
                >
                    {pages}
                </Document>
            </div>
            <button id="close" onClick={() => window.history.back()}>
                <img src={close} id="close-img" height="32px"/>
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
            <div id="btn-container-left"
                onMouseEnter={upButtonOpacity}
                onMouseLeave={downButtonOpacity}
            >
                <button
                    className="doc-nav-button previous-btn"
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                >
                    <img src={previous} />
                </button>
                <button
                    className="doc-nav-button next-btn"
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                >
                    <img src={next} />
                </button>
                <button
                    className="doc-nav-button zoom"
                    type="button"
                    onClick={upScale}
                >
                    <img src={zoom} />
                </button>
                <button
                    className="doc-nav-button unzoom"
                    type="button"
                    onClick={downScale}

                >
                    <img src={unzoom} />
                </button>
                <button
                    className="doc-nav-button download-button"
                    type="button"
                    onClick={downLoadLink}
                >

                    
                        <img src={downloadIcon} />
                </button>
            </div>
            <div id="btn-container-right"
                onMouseEnter={upButtonOpacity}
                onMouseLeave={downButtonOpacity}
            >
                <button
                    className="doc-nav-button previous-btn"
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                >
                    <img src={previous} />
                </button>
                <button
                    className="doc-nav-button next-btn"
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}

                >
                    <img src={next} />
                </button>
                <button
                    className="doc-nav-button zoom"
                    type="button"
                    onClick={upScale}

                >
                    <img src={zoom} />
                </button>
                <button
                    className="doc-nav-button unzoom"
                    type="button"
                    onClick={downScale}

                >
                    <img src={unzoom} />
                </button>
                <button
                    className="doc-nav-button download-button"
                    type="button"
                    onClick={downLoadLink}
                >
                        <img src={downloadIcon} />
                </button>
            </div>
        </div>
    );
}

export default Displayer;