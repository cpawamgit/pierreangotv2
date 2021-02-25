import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import concert from "../../berlin.jpg";
import tariffs from "../all/tariffs";
import catalog from "../all/catalog";
import license from "../all/license";

function Home(props) {
    let language = props.language;
    let [isReady, setIsReady] = useState(false);
    const [tariffsDisplay, setTarrifs] = useState(false);
    const [catalogDisplay, setCatalog] = useState(false);
    const [licenseDisplay, setLicense] = useState(false);
    const [contactDisplay, setContact] = useState(false);

    const [isEmpty, setIsEmpty] = useState(true);

    function setDisplay(params) {
        if (isEmpty) {
            if (params === "tariffs") {
                setTarrifs(true);
            } else if (params === "catalog") {
                setCatalog(true);
            } else if (params === "license"){
                setLicense(true);
            } else {
                setContact(true);
            }
        } else {
            setCatalog(false);
            setLicense(false);
            setTarrifs(false);
            setContact(false);
            setTimeout(() => {
                if (params === "tariffs") {
                    setTarrifs(true);
                } else if (params === "catalog") {
                    setCatalog(true);
                } else if (params === "license"){
                    setLicense(true);
                } else {
                    setContact(true);
                }
            }, 499);
        }
        setIsEmpty(false);
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
            <button id="language" onClick={props.toggleLanguage}><img src={props.language === "fr" ? "./union jack.png" : "./french flag.png"} /></button>
            <div id="pcl-background-container-global" className="pcl-background-container-global">
                <img src="sitebackground2.png" width="1920px" />
                <img src="sitebackground2.png" width="1920px" />
                <img src="sitebackground2.png" width="1920px" />
            </div>
            <div className="pcl-content-wrapper">

                <div id="pcl-background-container" style={{ backgroundColor: "black" }} className="pcl-background-container">
                    <img style={{ opacity: "0.8" }} src={concert} id="pcl-piano-jpg" height="1020px" />
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
                    <CSSTransition
                        in={true}
                        appear={true}
                        classNames="score-btns"
                        timeout={500}
                    >
                        <div className="score-btns">
                            <button onClick={() => setDisplay("tariffs")} className="score-display-btn"><h2 className="pcl-score-section">{props.language === "fr" ? "Les Tarifs" : "Tarrifs"}</h2></button>
                            <button onClick={() => setDisplay("catalog")} className="score-display-btn"><h2 className="pcl-score-section">{props.language === "fr" ? "Catalogue" : "Catalog"}</h2></button>
                            <button onClick={() => setDisplay("license")} className="score-display-btn"><h2 className="pcl-score-section">{props.language === "fr" ? "Licence" : "License"}</h2></button>
                            <button onClick={() => setDisplay("contact")} className="score-display-btn"><h2 className="pcl-score-section">Contact</h2></button>

                        </div>
                    </CSSTransition>
                    {isEmpty && <div id="filler" />}
                    <CSSTransition
                        mountOnEnter
                        unmountOnExit
                        in={tariffsDisplay}
                        timeout={500}
                        classNames="about-tariffs-anim"
                    >
                        <div className={`${props.format}main-about-text`}>
                        {tariffs}
                        </div>
                    </CSSTransition>
                    {props.language === "fr" ?
                        <CSSTransition
                            mountOnEnter
                            unmountOnExit
                            in={catalogDisplay}
                            timeout={500}
                            classNames="about-text-anim"
                        >
                            <div className={`${props.format}main-about-text`}>
                            {catalog.fr}
                            </div>
                        </CSSTransition>
                        :
                        <CSSTransition
                            mountOnEnter
                            unmountOnExit
                            in={catalogDisplay}
                            timeout={500}
                            classNames="about-text-anim"
                        >
                            <div className={`${props.format}main-about-text`}>
                            {catalog.en}
                            </div>
                        </CSSTransition>
                    }
                    {props.language === "fr" ?
                        <CSSTransition
                            mountOnEnter
                            unmountOnExit
                            in={licenseDisplay}
                            timeout={500}
                            classNames="about-text-anim"
                        >
                            <div className={`${props.format}main-about-text`}>
                            {license.fr}
                            </div>
                        </CSSTransition>
                        :
                        <CSSTransition
                            mountOnEnter
                            unmountOnExit
                            in={licenseDisplay}
                            timeout={500}
                            classNames="about-text-anim"
                        >
                            <div className={`${props.format}main-about-text`}>
                            {license.en}
                            </div>
                        </CSSTransition>
                    }
                    <CSSTransition
                        mountOnEnter
                        unmountOnExit
                        in={contactDisplay}
                        timeout={500}
                        classNames="about-tariffs-anim"
                    >
                        <div className={`${props.format}main-about-text ${props.format}contact`}>
                            <p>E-Mail : <a href="mailto:cyril.morin.tai@gmail.com" rel="noreferrer">cyril.morin.tai@gmail.com</a></p>
                            <p>Tel : 0033 6 63 59 28 28 / 0036 70 63 74 839</p>
                            <p>{language === "fr" ? "Le contact donné à la fin des partitions n'est plus valide, veuillez vous référer à cette section" : "The contact given at the end of the partitions is no longer valid, please refer to this section"}</p>
                        </div>
                    </CSSTransition>

                </div>
                <div className="pcl-footer-about">
                    <p id="pcl-footer-text">Designed by <a id="pcl-footer-link" href="http://www.cyrilmorin.fr" rel="noreferrer" target="_blank">Cyril Morin</a>, contact: <a href="mailto:cyril.morin.tai@gmail.com" rel="noreferrer">cyril.morin.tai@gmail.com</a></p>
                </div>
            </div>
        </div>
    ) : null;
}

export default Home;