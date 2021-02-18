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


    const pages = file.match(/a3/i) ?
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
                    file={file}
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
                    className="doc-nav-button"
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                    id="previous-btn"

                >
                    Previous
          </button>
                <button
                    className="doc-nav-button"
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                    id="next-btn"

                >
                    Next
          </button>
                <button
                    className="doc-nav-button"
                    id="zoom"
                    type="button"
                    onClick={upScale}

                >
                    zoom
          </button>
                <button
                    className="doc-nav-button"
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

export default Displayer;