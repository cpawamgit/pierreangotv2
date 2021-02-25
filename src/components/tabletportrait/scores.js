import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FileBrowser from "../../components/tabletportrait/filebrowser";
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
            container = document.getElementById("pcp-background-container");
            gContainer = document.getElementById("pcp-background-container-global");
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
            <button id="pcp-language" onClick={props.toggleLanguage}><img src={props.language === "fr" ? "./union jack.png" : "./french flag.png"}/></button>
            <div id="pcp-background-container-global" className="pcp-background-container-global">
                    <img src="/sitebackground2.png" width="1920px"/>
                    <img src="/sitebackground2.png" width="1920px"/>
                    <img src="/sitebackground2.png" width="1920px"/>
                </div>
            <div className="pcp-content-wrapper">
                
                <div id="pcp-background-container" className="pcp-background-container">
                    <img id="center-bg" src={concert} width="1800px"></img>
                </div>
                <div className="pcp-header-scores">
                    <h1 id="pcp-main-title">{language === "fr" ? "Pierre Angot, Compositeur Français" : "Pierre Angot, French Composer"}</h1>
                    <ul className="pcp-nav">
                        <div className="pcp-nav-list-container"><li><Link style={{fontSize: "calc(0.625vw + 1.25vh)"}} id="home-btn" className="pcp-nav-list link-bg" to="/">{language === "fr" ? "accueil" : "home"}</Link></li></div>
                        <div className="pcp-nav-list-container"><li><a style={{fontSize: "calc(0.625vw + 1.25vh)"}} className="pcp-nav-list link-bg" href="https://fr.wikipedia.org/wiki/Pierre_Angot" target="_blank" rel="norefferer">{language === "fr" ? "wikipedia" : "wikipedia"}</a></li></div>
                        <div className="pcp-nav-list-container"><li><Link style={{fontSize: "calc(0.625vw + 1.25vh)"}} className="pcp-nav-list link-bg" to="/about">{language === "fr" ? "Tarifs, catalogue, licence et contact" : "Tariffs, catalog, license and contact"}</Link></li></div>
                    </ul>
                </div>
                <FileBrowser format="pcp-"/>
                <div className="pcp-footer">
                    <p id="pcp-footer-text">Designed by <a id="pcp-footer-link" href="http://www.cyrilmorin.fr" rel="noreferrer" target="_blank">Cyril Morin</a>, contact: <a href="mailto:cyril.morin.tai@gmail.com" rel="noreferrer">cyril.morin.tai@gmail.com</a></p>
                </div>
            </div>
        </div>
    ) : null;
}

export default Scores;