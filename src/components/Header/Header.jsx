import React, { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faFileDownload, faBars, faQuestionCircle, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <header className="header">
      <span className="header-title">Diagnostic Tool</span>
      <button onClick={handleClick} className={open ? "open" : "closed"}>
        <span></span>
      </button>
      <span className="header-section">
        <p className="header-text">Logged in as General User</p>
        <div className="header-line"></div>
        <span className="header-icons">
          <FontAwesomeIcon icon={faBars} />
          <FontAwesomeIcon icon={faFileDownload} />
          <FontAwesomeIcon icon={faPrint} />
          <FontAwesomeIcon icon={faQuestionCircle} />
          <FontAwesomeIcon icon={faSignOutAlt} />
        </span>
      </span>
    </header>
  );
};

export default Header;