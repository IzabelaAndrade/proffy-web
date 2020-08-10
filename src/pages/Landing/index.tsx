import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import './styles.css';
import api from '../../services/api';

const Landing: React.FC =  () => {
  const [totalConections, setTotalConections] = useState(0);

  useEffect(() => {
    api.get('connections').then( response => setTotalConections(response.data.total)
    )
  }, [])
  return(
    <div id="page-landing">
      <div id="page-landing-contant" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Logo proffy"/>
          <h2>Sua plataforma de estudo online</h2>
        </div>
        <img src={landingImg} alt="Plataforma de estudo" className="hero-image"/>
        <div className="buttons-container">
          <Link to='/study' className="study">
            <img src={studyIcon} alt="Estudar"/>
            Estudar
          </Link>
          <Link to='/give-classes' className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas"/>
            Dar aulas
          </Link>
        </div>
        <span className="total-conections">
          Total de {totalConections} conexões já realizadas 
          <img src={purpleHeartIcon} alt="Coração roxo"/>
        </span>
      </div>

    </div>
  )
}

export default Landing;