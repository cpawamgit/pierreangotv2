import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import concert from "../../berlin.jpg";
import tariffs from "../all/tariffs";

function Home(props) {
    let language = props.language;
    let [isReady, setIsReady] = useState(false);
    const [tariffsDisplay, setTarrifs] = useState(false);
    const [catalogDisplay, setCatalog] = useState(false);
    const [licenseDisplay, setLicense] = useState(false);

    function setDisplay(params) {
        if (params === "tariffs"){
            setCatalog(false);
            setLicense(false);
            setTarrifs(true);
        } else if (params === "catalog"){
            setCatalog(true);
            setLicense(false);
            setTarrifs(false);
        } else {
            setCatalog(false);
            setLicense(true);
            setTarrifs(false)
        }
    }

    useEffect(() => {
        let piano;
        let container;
        let gContainer;
        let sub;
        let blackBg;
        //setting images--------------
        const bg = new Image();
        bg.onload = () => {
            setIsReady(true);
            gContainer = document.getElementById("pcl-background-container-global");
        }
        bg.src = concert;
        bg.id = "pcl-piano-jpg";
        bg.width = "1900px"

        //---------------------------
        let posScroll = window.scrollY;
        document.addEventListener('scroll', (e) => {
            posScroll = window.scrollY;
            gContainer.scrollTop = posScroll * 0.2;
        });

        return () => {
            document.removeEventListener('scroll', (e) => {
                posScroll = window.scrollY;
                gContainer.scrollTop = posScroll * 0.2;
            });
        }
    }, [])

    return isReady ? (
        <div className="home-main-wrapper">
            <button id="language" onClick={props.toggleLanguage}><img src={props.language === "fr" ? "./union jack.png" : "./french flag.png"}/></button>
            <div id="pcl-background-container-global" className="pcl-background-container-global">
                <img src="sitebackground2.png" width="1920px" />
                <img src="sitebackground2.png" width="1920px" />
                <img src="sitebackground2.png" width="1920px" />
            </div>
            <div className="pcl-content-wrapper">

                <div id="pcl-background-container" style={{backgroundColor: "black"}} className="pcl-background-container">
                    <img style={{opacity: "0.5"}} src={concert} id="pcl-piano-jpg" height="1020px"/>
                    <div id="black-bg"></div>
                </div>
                <div className="pcl-header">
                        <h1 id="pcl-main-title">{language === "fr" ? "Pierre Angot, Compositeur Français" : "Pierre Angot, French Composer"}</h1>
                    <ul className="pcl-nav">
                        <div className="pcl-nav-list-container"><li><Link id="home-btn" className="pcl-nav-list" to="/">{language === "fr" ? "accueil" : "home"}</Link></li></div>
                        <div className="pcl-nav-list-container"><li><Link className="pcl-nav-list" to="/scores/sitePdfs">{language === "fr" ? "explorer les partitions" : "browse the scores"}</Link></li></div>
                        <div className="pcl-nav-list-container"><li><a className="pcl-nav-list" href="https://fr.wikipedia.org/wiki/Pierre_Angot" target="_blank" rel="norefferer">{language === "fr" ? "wikipedia" : "wikipedia"}</a></li></div>
                    </ul>
                </div>
                <div className="pcl-main-about">
                    <div className="score-btns">
                    <button onClick={() => setDisplay("tariffs")}><h2 className="pcl-score-section">{props.language === "fr" ? "Les tariffs" : "Tarrifs"}</h2></button>
                    <button onClick={() => setDisplay("catalog")}><h2 className="pcl-score-section">{props.language === "fr" ? "Catalogue" : "Catalog"}</h2></button>
                    <button onClick={() => setDisplay("license")}><h2 className="pcl-score-section">License</h2></button>
                    
                    </div>
                    {!tariffsDisplay && !licenseDisplay && !catalogDisplay && <div id="filler"/>}
                    {tariffsDisplay && tariffs}
                    {licenseDisplay && <h2>liceeeeeense !!!!</h2>}
                    {catalogDisplay && <h2>cataloooooooooooog !!!!</h2>}

                </div>
                <div className="pcl-footer-about">
                    <p id="pcl-footer-text">Designed by <a id="pcl-footer-link" href="http://www.cyrilmorin.fr" rel="noreferrer" target="_blank">Cyril Morin</a>, contact: <a href="mailto:cyril.morin.tai@gmail.com" rel="noreferrer">cyril.morin.tai@gmail.com</a></p>
                </div>
            </div>
        </div>
    ) : null;
}

export default Home;