import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import concert from "../../concert3.jpg";

function Home(props) {
    let language = props.language;
    let [isReady, setIsReady] = useState(false);

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
            piano = document.getElementById("pcl-piano-jpg");
            container = document.getElementById("pcl-background-container");
            gContainer = document.getElementById("pcl-background-container-global");
            sub = document.getElementById("pcl-subtitle");
            blackBg = document.getElementById("black-bg");
        }
        bg.src = concert;
        bg.id = "pcl-piano-jpg";
        bg.width = "1900px"

        //---------------------------
        let posScroll = window.scrollY;
        document.addEventListener('scroll', (e) => {
            posScroll = window.scrollY;
            if (posScroll === 0) {
                piano.style.opacity = 1;
                blackBg.style.opacity = 1;
                sub.style.color = "rgb(255, 255, 255)";
            } else if (posScroll < 450) {
                piano.style.opacity = 1 - (posScroll * 2 / 1000);
                blackBg.style.opacity = 1 - (posScroll * 2 / 1000);
                sub.style.color = `rgb(${255 - (posScroll * 2 / 3.6)}, ${255 - (posScroll * 2 / 3.6)}, ${255 - (posScroll * 2 / 3.6)})`;
            } else {
                piano.style.opacity = 0.1;
                blackBg.style.opacity = 0.1;
                sub.style.color = "rgb(6, 6, 6)";
            }
            container.scrollTop = posScroll * 0.1;
            gContainer.scrollTop = posScroll * 1.5;
        });

        return () => {
            document.removeEventListener('scroll', (e) => {
                posScroll = window.scrollY;
                container.scrollTop = posScroll * 0.1;
                gContainer.scrollTop = posScroll * 1.5;
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

                <div id="pcl-background-container" className="pcl-background-container">
                    <img src={concert} id="pcl-piano-jpg" height="1020px"/>
                    <div id="black-bg"></div>
                    <svg id="svg-anim" width="1920" height="1080">
            <circle cx="1000" cy="550" r="1000" strokeWidth="2000" stroke="black" fill="transparent">
            <animate attributeName="r" values="1000;1150;" dur="1s" repeatCount="1" fill="freeze"/>
                <animate attributeName="r" values="1150;2200;" begin="4s" dur="2s" repeatCount="1" fill="freeze"/>
                </circle>
         </svg> 
                </div>
                <div className="pcl-header">
                    <CSSTransition
                        in={true}
                        classNames="title"
                        timeout={2000}
                        appear={true}
                    >
                        <h1 id="pcl-main-title">{language === "fr" ? "Pierre Angot, Compositeur Français" : "Pierre Angot, French Composer"}</h1>
                    </CSSTransition>
                    <CSSTransition
                        in={true}
                        classNames="nav"
                        timeout={4000}
                        appear={true}
                    >
                    <ul className="pcl-nav">
                        <div className="pcl-nav-list-container"><li><Link className="pcl-nav-list" to="/scores/sitePdfs">{language === "fr" ? "explorer les partitions" : "browse the scores"}</Link></li></div>
                        <div className="pcl-nav-list-container"><li><a className="pcl-nav-list" href="https://fr.wikipedia.org/wiki/Pierre_Angot" target="_blank" rel="norefferer">{language === "fr" ? "wikipedia" : "wikipedia"}</a></li></div>
                        <div className="pcl-nav-list-container"><li><Link className="pcl-nav-list" to="/about">{language === "fr" ? "Tarifs, catalogue, licence et contact" : "Tariffs, catalog, license and contact"}</Link></li></div>
                    </ul>
                    </CSSTransition>
                </div>
                <div className="pcl-main">
                    <div id="pcl-subtitle-container">
                        <CSSTransition
                            in={true}
                            classNames="sub-title"
                            timeout={6000}
                            appear={true}
                        >
                            <h2 id="pcl-subtitle" onClick={() => window.scrollTo({top: 440, behavior: "smooth"})}>{language === "fr" ? "\"Ajouter et ne rien détruire\"" : "\"Add and do not destroy\""}</h2>
                        </CSSTransition>
                    </div>
                    <p className="pcl-main-text">{language === "fr" ? "Pierre ANGOT est un compositeur français né en Normandie , le premier mars 1958." : "Pierre ANGOT is a French composer born in Normandy on March 1, 1958."}</p>
                    <p className="pcl-main-text">{language === "fr" ? "Dans sa jeunesse il fût autant musicien de jazz que d'orchestre, il sera aussi professeur de basson." : "In his youth he was as much a jazz musician as an orchestra, he was also a bassoon teacher."}</p>
                    <p className="pcl-main-text">{language === "fr" ? "Elève en composition d'Alain Abbot il s'en détournera rapidement se mettant en rupture dans les années 90 jusqu’à détruire son travail accompli jusque là : il le jugera trop  conforme à la doxa musicale de la deuxième partie du 20ème siècle jusqu'à aujourd'hui." : "Pupil in composition of Alain Abbot he will turn away quickly breaking in the 90s until destroying his work accomplished until then: he will judge it too conforms to the musical doxa of the second part of the 20th century until today."}</p>
                    <p className="pcl-main-text">{language === "fr" ? "Pour lui, sa production débutera donc réellement en 2002 avec la \"Sonatine Picturale\", créée cette même année par le pianiste Mickaël Bardin. Il  reniera donc toutes ses pièces antérieures  sauf ce qu'il comptera pour ses 4 premiers Opus qui sont plus de l'ordre de la gageure musicale. Il cherchera à retrouver le contact avec le public perdu dans les courants de l'école de Darmstadt, notamment sériel ou musique concrète. Il ne prêtera pas  plus d'intérêt aux dernières mouvances telles  que le néo tonalisme. On peut donc difficilement qualifier la musique de Pierre ANGOT,  si ce n'est qu'elle est le fruit incessant de longues recherches sur le plan esthétique, recherchant à redonner une vérité émotionnelle à la musique dite savante." : "For him, his production will therefore really begin in 2002 with the \"Sonatine Picturale\", created that same year by pianist Mickaël Bardin. He will therefore renounce all his previous pieces except what he will count for his first 4 Opus which are more of a musical challenge. He will seek to find contact with the public lost in the currents of the Darmstadt school, in particular serial or concrete music. He will not pay more interest to the latest movements such as neo-tonalism. It is therefore difficult to qualify the music of Pierre ANGOT, except that it is the incessant fruit of long research on the aesthetic level, seeking to restore emotional truth to so-called scholarly music."}</p>
                    <p className="pcl-main-text">{language === "fr" ? "Son engouement ira à des compositeurs tels qu'Henri Tomasi  ou  Henri Dutilleux pour renouveler le langage musical. La recherche obsessionnelle de nouvelles couleurs musicales, sans jamais se départir de l'héritage du passé, peut qualifier la démarche de Pierre ANGOT :  \"Ajouter et ne rien détruire\" pourrait être sa devise." : "His enthusiasm will go to composers such as Henri Tomasi or Henri Dutilleux to renew the musical language. The obsessive search for new musical colors, without ever departing from the heritage of the past, can qualify Pierre ANGOT's approach: \"Add and do not destroy anything\" could be his motto."}</p>
                    <p style={{textAlign: "right", fontSize: "calc(0.5vh + 1vw)"}}>Cyril Morin</p>
                </div>
                <div className="pcl-footer">
                    <p id="pcl-footer-text">Designed by <a id="pcl-footer-link" href="http://www.cyrilmorin.fr" rel="noreferrer" target="_blank">Cyril Morin</a>, contact: <a href="mailto:cyril.morin.tai@gmail.com" rel="noreferrer">cyril.morin.tai@gmail.com</a></p>
                </div>
            </div>
        </div>
    ) : null;
}

export default Home;