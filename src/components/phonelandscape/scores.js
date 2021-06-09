import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FileBrowser from "./filebrowser";
import concert from "../../concert-hall.jpg";

function Scores(props) {
    let language = props.language;
    let [isReady, setIsReady] = useState(false);
    
    useEffect(() => {
        let posScroll = window.scrollY;
        let container;
        let gContainer;
        //setting images--------------
        const bg = new Image();
        bg.onload = () => {
            setIsReady(true);
            container = document.getElementById("pcl-background-container");
            gContainer = document.getElementById("pcl-background-container-global");
        }
        bg.src = concert;
        bg.width = "1900px"
        document.addEventListener('scroll', (e) => {
            posScroll = window.scrollY;
            container.scrollTop = posScroll * 0.46;
            gContainer.scrollTop = posScroll * 1.5;
        });

        return () => {
            document.removeEventListener('scroll', (e) => {
                posScroll = window.scrollY;
                container.scrollTop = posScroll * 0.46;
                gContainer.scrollTop = posScroll * 1.5;
            });
        }
    }, [])
    return isReady ? (
        <div>
            <button id="language" onClick={props.toggleLanguage} style={{right: "2vw"}}><img src={props.language === "fr" ? "./union jack.png" : "./french flag.png"} height="12px"/></button>
            <div style={{display: "none"}} id="pcl-background-container-global" className="pcl-background-container-global">
                    <img src="/sitebackground2.png" width="1920px"/>
                    <img src="/sitebackground2.png" width="1920px"/>
                    <img src="/sitebackground2.png" width="1920px"/>
                </div>
            <div className="pcl-content-wrapper" style={{width: "100vw", left: "0"}}>
                
                <div id="pcl-background-container" className="pcl-background-container" style={{width: "100vw", left: "0"}}>
                    <img id="center-bg" src={concert} width="100%"></img>
                </div>
                <div className="pcl-header-scores">
                    <h1 id="pcl-main-title">{language === "fr" ? "Pierre Angot, Compositeur Français" : "Pierre Angot, French Composer"}</h1>
                    <ul className="pcl-nav" style={{marginLeft: "15vw", width: "65vw"}}>
                        <div className="pcl-nav-list-container"><li><Link style={{fontSize: "calc(0.75vh + 1.5vw)"}} id="home-btn" className="pcl-nav-list link-bg" to="/">{language === "fr" ? "accueil" : "home"}</Link></li></div>
                        <div className="pcl-nav-list-container"><li><a style={{fontSize: "calc(0.75vh + 1.5vw)"}} className="pcl-nav-list link-bg" href="https://fr.wikipedia.org/wiki/Pierre_Angot" target="_blank" rel="norefferer">{language === "fr" ? "wikipedia" : "wikipedia"}</a></li></div>
                        <div className="pcl-nav-list-container"><li><Link style={{fontSize: "calc(0.75vh + 1.5vw)"}} className="pcl-nav-list link-bg" to="/about">{language === "fr" ? "Tarifs, catalogue, licence et contact" : "Tariffs, catalog, license and contact"}</Link></li></div>
                    </ul>
                </div>
                <FileBrowser format=""/>
                <div className="pcl-footer" 
                style={{
                    marginTop: "auto",
                    marginBottom: 0,
                    height: "13vh"
                }}
                >
                    <p id="pcl-footer-text">Designed by <a id="pcl-footer-link" href="http://www.cyrilmorin.fr" rel="noreferrer" target="_blank">Cyril Morin</a>, contact: <a href="mailto:cyril.morin.tai@gmail.com" rel="noreferrer">cyril.morin.tai@gmail.com</a></p>
                </div>
            </div>
        </div>
    ) : null;
}

export default Scores;