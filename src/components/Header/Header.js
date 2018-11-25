import React from 'react';
import {Link} from "react-router-dom";
import './Header.scss'

const Header = ({logo})=> {
  return (
    <header className="header">
      <div className="header__logo">
      </div>
      <nav className="header__navigation">
        <ul className="header__list">
          <li className="header__item">
            <Link to='/'>Home</Link>
          </li>
          <li className="header__item">
          <Link to='/countries'>Countries</Link>
          </li>
          <li className="header__item">Films</li>
          <li className="header__item">Games</li>
          <li className="header__item">Contacts</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;