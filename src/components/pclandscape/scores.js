import { Link } from "react-router-dom";
import { useEffect } from "react";
import FileBrowser from "../../components/all/filebrowser";

function Scores(props) {
    let language = props.language;
    
    useEffect(() => {
        let posScroll = window.scrollY;
        let container = document.getElementById("pcl-background-container");
        let gContainer = document.getElementById("pcl-background-container-global");
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

    return (
        <div>
            <div id="pcl-background-container-global" className="pcl-background-container-global">
                    <img src="/sitebackground2.png" width="1920px"/>
                    <img src="/sitebackground2.png" width="1920px"/>
                    <img src="/sitebackground2.png" width="1920px"/>
                </div>
            <div className="pcl-content-wrapper">
                
                <div id="pcl-background-container" className="pcl-background-container">
                    <img id="center-bg" src="/concert-hall.jpg"></img>
                </div>
                <div className="pcl-header-scores">
                    <h1 id="pcl-main-title">{language === "fr" ? "Pierre Angot, Compositeur Français" : "Pierre Angot, French Composer"}</h1>
                    <ul className="pcl-nav">
                        <div className="pcl-nav-list-container"><li><Link id="home-btn" className="pcl-nav-list link-bg" to="/">{language === "fr" ? "accueil" : "home"}</Link></li></div>
                        {/* {<div className="pcl-nav-list-container"><li><Link id="scores-btn" className="pcl-nav-list link-bg" to="/scores">{language === "fr" ? "explorer les partitions" : "browse the scores"}</Link></li></div>} */}
                        <div className="pcl-nav-list-container"><li><a className="pcl-nav-list link-bg" href="https://fr.wikipedia.org/wiki/Pierre_Angot" target="_blank" rel="norefferer">{language === "fr" ? "wikipedia" : "wikipedia"}</a></li></div>
                        <div className="pcl-nav-list-container"><li><Link className="pcl-nav-list link-bg" to="/about">{language === "fr" ? "tarifs et droits d'utilisation" : "Tariffs and rights of use"}</Link></li></div>
                    </ul>
                </div>
                <FileBrowser />
                <div className="pcl-footer">
                    <p id="pcl-footer-text">Designed by <a id="pcl-footer-link" href="http://www.cyrilmorin.fr" rel="noreferrer" target="_blank">Cyril Morin</a>, contact: <a href="mailto:cyril.morin.tai@gmail.com" rel="noreferrer">cyril.morin.tai@gmail.com</a></p>
                </div>
            </div>
        </div>
    );
}

export default Scores;